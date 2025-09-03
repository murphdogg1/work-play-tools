"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { trackCalculatorInput, trackCalculatorSubmit, trackCalculatorCopy } from "@/lib/analytics";
import { currency } from "@/lib/format";

// Helper functions for formatting
const formatCurrency = (value: number): string => currency(value);
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

interface PaystubData {
  // Employee Information
  employeeName: string;
  employeeId: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Employer Information
  employerName: string;
  employerAddress: string;
  employerCity: string;
  employerState: string;
  employerZipCode: string;
  
  // Pay Period Information
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  
  // Pay Information
  payType: "hourly" | "salary";
  hourlyRate: number;
  salary: number;
  hoursWorked: number;
  overtimeHours: number;
  overtimeRate: number;
  
  // Deductions
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  healthInsurance: number;
  retirement401k: number;
  otherDeductions: number;
  
  // Additional Earnings
  bonus: number;
  commission: number;
  otherEarnings: number;
}

const defaultPaystubData: PaystubData = {
  employeeName: "",
  employeeId: "",
  ssn: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  employerName: "",
  employerAddress: "",
  employerCity: "",
  employerState: "",
  employerZipCode: "",
  payPeriodStart: "",
  payPeriodEnd: "",
  payDate: "",
  payType: "hourly",
  hourlyRate: 0,
  salary: 0,
  hoursWorked: 0,
  overtimeHours: 0,
  overtimeRate: 0,
  federalTax: 0,
  stateTax: 0,
  socialSecurity: 0,
  medicare: 0,
  healthInsurance: 0,
  retirement401k: 0,
  otherDeductions: 0,
  bonus: 0,
  commission: 0,
  otherEarnings: 0,
};

export default function PaystubGenerator() {
  const [data, setData] = useState<PaystubData>(defaultPaystubData);
  const [generatedPaystub, setGeneratedPaystub] = useState<string>("");

  const updateField = useCallback((field: keyof PaystubData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Track analytics
    if (typeof value === 'number') {
      let valueBucket: string | undefined;
      if (value < 100) valueBucket = "0-100";
      else if (value < 500) valueBucket = "100-500";
      else if (value < 1000) valueBucket = "500-1000";
      else if (value < 5000) valueBucket = "1000-5000";
      else valueBucket = "5000+";
      
      trackCalculatorInput("paystub-generator", field, valueBucket);
    } else {
      trackCalculatorInput("paystub-generator", field, "text");
    }
  }, []);

  const calculatePaystub = useCallback(() => {
    const {
      payType,
      hourlyRate,
      salary,
      hoursWorked,
      overtimeHours,
      overtimeRate,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      healthInsurance,
      retirement401k,
      otherDeductions,
      bonus,
      commission,
      otherEarnings
    } = data;

    // Calculate gross pay
    let grossPay = 0;
    if (payType === "hourly") {
      const regularPay = hoursWorked * hourlyRate;
      const overtimePay = overtimeHours * (overtimeRate || hourlyRate * 1.5);
      grossPay = regularPay + overtimePay;
    } else {
      // For salary, assume bi-weekly pay period
      grossPay = salary / 26;
    }

    // Add additional earnings
    grossPay += bonus + commission + otherEarnings;

    // Calculate total deductions
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + 
                           healthInsurance + retirement401k + otherDeductions;

    // Calculate net pay
    const netPay = grossPay - totalDeductions;

    // Generate paystub HTML
    const paystubHtml = generatePaystubHTML(data, grossPay, totalDeductions, netPay);
    setGeneratedPaystub(paystubHtml);

    trackCalculatorSubmit("paystub-generator");
  }, [data]);

  const copyPaystub = useCallback(async () => {
    if (generatedPaystub) {
      try {
        await navigator.clipboard.writeText(generatedPaystub);
        trackCalculatorCopy("paystub-generator");
        alert("Paystub copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy paystub:', err);
      }
    }
  }, [generatedPaystub]);

  const printPaystub = useCallback(() => {
    if (generatedPaystub) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Paystub</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .paystub { max-width: 800px; margin: 0 auto; border: 1px solid #ccc; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${generatedPaystub}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }, [generatedPaystub]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={data.employeeName}
                  onChange={(e) => updateField("employeeName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={data.employeeId}
                  onChange={(e) => updateField("employeeId", e.target.value)}
                  placeholder="EMP001"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ssn">SSN (Last 4 digits)</Label>
              <Input
                id="ssn"
                value={data.ssn}
                onChange={(e) => updateField("ssn", e.target.value)}
                placeholder="1234"
                maxLength={4}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={data.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="123 Main St"
                rows={2}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={data.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  placeholder="NY"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={data.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="employerName">Company Name</Label>
              <Input
                id="employerName"
                value={data.employerName}
                onChange={(e) => updateField("employerName", e.target.value)}
                placeholder="ABC Company Inc."
              />
            </div>

            <div>
              <Label htmlFor="employerAddress">Company Address</Label>
              <Textarea
                id="employerAddress"
                value={data.employerAddress}
                onChange={(e) => updateField("employerAddress", e.target.value)}
                placeholder="456 Business Ave"
                rows={2}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="employerCity">City</Label>
                <Input
                  id="employerCity"
                  value={data.employerCity}
                  onChange={(e) => updateField("employerCity", e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="employerState">State</Label>
                <Input
                  id="employerState"
                  value={data.employerState}
                  onChange={(e) => updateField("employerState", e.target.value)}
                  placeholder="NY"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="employerZipCode">ZIP Code</Label>
                <Input
                  id="employerZipCode"
                  value={data.employerZipCode}
                  onChange={(e) => updateField("employerZipCode", e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pay Period Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="payPeriodStart">Pay Period Start</Label>
                <Input
                  id="payPeriodStart"
                  type="date"
                  value={data.payPeriodStart}
                  onChange={(e) => updateField("payPeriodStart", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="payPeriodEnd">Pay Period End</Label>
                <Input
                  id="payPeriodEnd"
                  type="date"
                  value={data.payPeriodEnd}
                  onChange={(e) => updateField("payPeriodEnd", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="payDate">Pay Date</Label>
                <Input
                  id="payDate"
                  type="date"
                  value={data.payDate}
                  onChange={(e) => updateField("payDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pay Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="payType">Pay Type</Label>
              <Select value={data.payType} onValueChange={(value: "hourly" | "salary") => updateField("payType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {data.payType === "hourly" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      step="0.01"
                      value={data.hourlyRate}
                      onChange={(e) => updateField("hourlyRate", parseFloat(e.target.value) || 0)}
                      placeholder="25.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoursWorked">Hours Worked</Label>
                    <Input
                      id="hoursWorked"
                      type="number"
                      step="0.1"
                      value={data.hoursWorked}
                      onChange={(e) => updateField("hoursWorked", parseFloat(e.target.value) || 0)}
                      placeholder="40"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="overtimeHours">Overtime Hours</Label>
                    <Input
                      id="overtimeHours"
                      type="number"
                      step="0.1"
                      value={data.overtimeHours}
                      onChange={(e) => updateField("overtimeHours", parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="overtimeRate">Overtime Rate</Label>
                    <Input
                      id="overtimeRate"
                      type="number"
                      step="0.01"
                      value={data.overtimeRate}
                      onChange={(e) => updateField("overtimeRate", parseFloat(e.target.value) || 0)}
                      placeholder="37.50"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="salary">Annual Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  step="0.01"
                  value={data.salary}
                  onChange={(e) => updateField("salary", parseFloat(e.target.value) || 0)}
                  placeholder="50000"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="bonus">Bonus</Label>
                <Input
                  id="bonus"
                  type="number"
                  step="0.01"
                  value={data.bonus}
                  onChange={(e) => updateField("bonus", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="commission">Commission</Label>
                <Input
                  id="commission"
                  type="number"
                  step="0.01"
                  value={data.commission}
                  onChange={(e) => updateField("commission", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="otherEarnings">Other Earnings</Label>
                <Input
                  id="otherEarnings"
                  type="number"
                  step="0.01"
                  value={data.otherEarnings}
                  onChange={(e) => updateField("otherEarnings", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="federalTax">Federal Tax</Label>
                <Input
                  id="federalTax"
                  type="number"
                  step="0.01"
                  value={data.federalTax}
                  onChange={(e) => updateField("federalTax", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="stateTax">State Tax</Label>
                <Input
                  id="stateTax"
                  type="number"
                  step="0.01"
                  value={data.stateTax}
                  onChange={(e) => updateField("stateTax", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="socialSecurity">Social Security</Label>
                <Input
                  id="socialSecurity"
                  type="number"
                  step="0.01"
                  value={data.socialSecurity}
                  onChange={(e) => updateField("socialSecurity", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="medicare">Medicare</Label>
                <Input
                  id="medicare"
                  type="number"
                  step="0.01"
                  value={data.medicare}
                  onChange={(e) => updateField("medicare", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="healthInsurance">Health Insurance</Label>
                <Input
                  id="healthInsurance"
                  type="number"
                  step="0.01"
                  value={data.healthInsurance}
                  onChange={(e) => updateField("healthInsurance", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="retirement401k">401(k) Retirement</Label>
                <Input
                  id="retirement401k"
                  type="number"
                  step="0.01"
                  value={data.retirement401k}
                  onChange={(e) => updateField("retirement401k", parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="otherDeductions">Other Deductions</Label>
              <Input
                id="otherDeductions"
                type="number"
                step="0.01"
                value={data.otherDeductions}
                onChange={(e) => updateField("otherDeductions", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={calculatePaystub} className="w-full">
          Generate Paystub
        </Button>
      </div>

      {/* Generated Paystub */}
      <div className="space-y-4">
        {generatedPaystub && (
          <>
            <div className="flex gap-2">
              <Button onClick={copyPaystub} variant="outline">
                Copy Paystub
              </Button>
              <Button onClick={printPaystub} variant="outline">
                Print Paystub
              </Button>
            </div>
            <div 
              className="border rounded-lg p-4 bg-white"
              dangerouslySetInnerHTML={{ __html: generatedPaystub }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function generatePaystubHTML(data: PaystubData, grossPay: number, totalDeductions: number, netPay: number): string {
  const {
    employeeName,
    employeeId,
    ssn,
    address,
    city,
    state,
    zipCode,
    employerName,
    employerAddress,
    employerCity,
    employerState,
    employerZipCode,
    payPeriodStart,
    payPeriodEnd,
    payDate,
    payType,
    hourlyRate,
    salary,
    hoursWorked,
    overtimeHours,
    overtimeRate,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    healthInsurance,
    retirement401k,
    otherDeductions,
    bonus,
    commission,
    otherEarnings
  } = data;

  return `
    <div class="paystub" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #ccc; background: white;">
      <!-- Header -->
      <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">PAY STATEMENT</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px;">${employerName || 'Company Name'}</p>
      </div>

      <!-- Employee and Employer Info -->
      <div style="display: flex; border-bottom: 1px solid #ccc;">
        <div style="flex: 1; padding: 20px; border-right: 1px solid #ccc;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1e40af;">EMPLOYEE INFORMATION</h3>
          <p style="margin: 2px 0; font-size: 14px;"><strong>Name:</strong> ${employeeName || 'Employee Name'}</p>
          <p style="margin: 2px 0; font-size: 14px;"><strong>Employee ID:</strong> ${employeeId || 'N/A'}</p>
          <p style="margin: 2px 0; font-size: 14px;"><strong>SSN:</strong> ***-**-${ssn || '1234'}</p>
          <p style="margin: 2px 0; font-size: 14px;"><strong>Address:</strong> ${address || 'Address'}</p>
          <p style="margin: 2px 0; font-size: 14px;">${city || 'City'}, ${state || 'ST'} ${zipCode || '12345'}</p>
        </div>
        <div style="flex: 1; padding: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1e40af;">EMPLOYER INFORMATION</h3>
          <p style="margin: 2px 0; font-size: 14px;"><strong>Company:</strong> ${employerName || 'Company Name'}</p>
          <p style="margin: 2px 0; font-size: 14px;"><strong>Address:</strong> ${employerAddress || 'Address'}</p>
          <p style="margin: 2px 0; font-size: 14px;">${employerCity || 'City'}, ${employerState || 'ST'} ${employerZipCode || '12345'}</p>
        </div>
      </div>

      <!-- Pay Period Info -->
      <div style="background: #f8fafc; padding: 15px; border-bottom: 1px solid #ccc;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 2px 0; font-size: 14px;"><strong>Pay Period:</strong> ${formatDate(payPeriodStart) || 'MM/DD/YYYY'} - ${formatDate(payPeriodEnd) || 'MM/DD/YYYY'}</p>
            <p style="margin: 2px 0; font-size: 14px;"><strong>Pay Date:</strong> ${formatDate(payDate) || 'MM/DD/YYYY'}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 2px 0; font-size: 18px; font-weight: bold; color: #1e40af;">NET PAY</p>
            <p style="margin: 2px 0; font-size: 24px; font-weight: bold; color: #1e40af;">${formatCurrency(netPay)}</p>
          </div>
        </div>
      </div>

      <!-- Earnings and Deductions -->
      <div style="display: flex;">
        <!-- Earnings -->
        <div style="flex: 1; padding: 20px; border-right: 1px solid #ccc;">
          <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e40af;">EARNINGS</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ccc; font-size: 12px;">Description</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ccc; font-size: 12px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${payType === 'hourly' ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Regular Hours (${hoursWorked} @ $${hourlyRate.toFixed(2)})</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(hoursWorked * hourlyRate)}</td>
                </tr>
                ${overtimeHours > 0 ? `
                  <tr>
                    <td style="padding: 8px; font-size: 14px;">Overtime Hours (${overtimeHours} @ $${(overtimeRate || hourlyRate * 1.5).toFixed(2)})</td>
                    <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(overtimeHours * (overtimeRate || hourlyRate * 1.5))}</td>
                  </tr>
                ` : ''}
              ` : `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Salary (Bi-weekly)</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(salary / 26)}</td>
                </tr>
              `}
              ${bonus > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Bonus</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(bonus)}</td>
                </tr>
              ` : ''}
              ${commission > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Commission</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(commission)}</td>
                </tr>
              ` : ''}
              ${otherEarnings > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Other Earnings</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(otherEarnings)}</td>
                </tr>
              ` : ''}
              <tr style="border-top: 2px solid #1e40af;">
                <td style="padding: 8px; font-weight: bold; font-size: 14px;">TOTAL GROSS PAY</td>
                <td style="padding: 8px; text-align: right; font-weight: bold; font-size: 14px;">${formatCurrency(grossPay)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Deductions -->
        <div style="flex: 1; padding: 20px;">
          <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e40af;">DEDUCTIONS</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ccc; font-size: 12px;">Description</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ccc; font-size: 12px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${federalTax > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Federal Tax</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(federalTax)}</td>
                </tr>
              ` : ''}
              ${stateTax > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">State Tax</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(stateTax)}</td>
                </tr>
              ` : ''}
              ${socialSecurity > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Social Security</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(socialSecurity)}</td>
                </tr>
              ` : ''}
              ${medicare > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Medicare</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(medicare)}</td>
                </tr>
              ` : ''}
              ${healthInsurance > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Health Insurance</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(healthInsurance)}</td>
                </tr>
              ` : ''}
              ${retirement401k > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">401(k) Retirement</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(retirement401k)}</td>
                </tr>
              ` : ''}
              ${otherDeductions > 0 ? `
                <tr>
                  <td style="padding: 8px; font-size: 14px;">Other Deductions</td>
                  <td style="padding: 8px; text-align: right; font-size: 14px;">${formatCurrency(otherDeductions)}</td>
                </tr>
              ` : ''}
              <tr style="border-top: 2px solid #1e40af;">
                <td style="padding: 8px; font-weight: bold; font-size: 14px;">TOTAL DEDUCTIONS</td>
                <td style="padding: 8px; text-align: right; font-weight: bold; font-size: 14px;">${formatCurrency(totalDeductions)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #ccc;">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          This is a computer-generated pay statement. For questions, contact your HR department.
        </p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">
          Generated by WorkPayTools.com - ${new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  `;
}
