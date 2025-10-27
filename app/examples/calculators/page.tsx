'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function CalculatorsDemoPage() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(25);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-gradient">Calculator Tools</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try an interactive loan calculator. Help customers make informed decisions with custom calculators for pricing, ROI, quotes, and more.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Mortgage Calculator</h2>
                <p className="text-text-secondary">Demo: Interactive Loan Payment Calculator</p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <MotionReveal delay={0.1}>
                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-6">Enter Details</h3>

                  <div className="space-y-6">
                    {/* Loan Amount */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Amount
                      </label>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">£</span>
                        <input
                          type="range"
                          min="50000"
                          max="1000000"
                          step="10000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                      <div className="mt-2 text-2xl font-bold text-accent-primary">
                        £{loanAmount.toLocaleString()}
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Interest Rate
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-lg">%</span>
                      </div>
                      <div className="mt-2 text-2xl font-bold text-accent-primary">
                        {interestRate.toFixed(1)}%
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Term
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="35"
                          step="1"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-lg">years</span>
                      </div>
                      <div className="mt-2 text-2xl font-bold text-accent-primary">
                        {loanTerm} years
                      </div>
                    </div>
                  </div>
                </Card>
              </MotionReveal>

              {/* Results Section */}
              <MotionReveal delay={0.2}>
                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-6">Your Results</h3>

                  <div className="space-y-6">
                    {/* Monthly Payment */}
                    <div className="p-6 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
                      <div className="text-sm text-text-secondary mb-2">Monthly Payment</div>
                      <div className="text-4xl font-bold text-accent-primary">
                        £{monthlyPayment.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">per month</div>
                    </div>

                    {/* Total Payment */}
                    <div>
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-text-secondary">Total Amount Paid</span>
                        <span className="font-semibold">
                          £{totalPayment.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-text-secondary">Total Interest</span>
                        <span className="font-semibold text-orange-400">
                          £{totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-text-secondary">Original Loan</span>
                        <span className="font-semibold">
                          £{loanAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button href="/contact" size="lg" className="w-full">
                      Get Pre-Approved
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">What This Demo Shows</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Real-Time Calculations</h3>
                  <p className="text-sm text-text-secondary">
                    Results update instantly as customers adjust inputs—no page refresh needed.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Clear Visual Feedback</h3>
                  <p className="text-sm text-text-secondary">
                    Easy-to-understand sliders and formatted results help customers make decisions.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Lead Generation</h3>
                  <p className="text-sm text-text-secondary">
                    Direct call-to-action buttons convert calculator users into qualified leads.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.4}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Custom Logic</h3>
                  <p className="text-sm text-text-secondary">
                    Build calculators for any formula�"ROI, pricing, savings, conversions, and more.
                  </p>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* Use Cases Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Calculator Ideas</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <Calculator className="w-8 h-8 text-accent-primary mb-4" />
                  <h3 className="font-semibold mb-3">Financial</h3>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Loan payments</li>
                    <li>• ROI calculators</li>
                    <li>• Savings projections</li>
                    <li>• Investment returns</li>
                  </ul>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <Calculator className="w-8 h-8 text-accent-primary mb-4" />
                  <h3 className="font-semibold mb-3">Pricing</h3>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Quote generators</li>
                    <li>• Product configurators</li>
                    <li>• Shipping estimates</li>
                    <li>• Package builders</li>
                  </ul>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <Calculator className="w-8 h-8 text-accent-primary mb-4" />
                  <h3 className="font-semibold mb-3">Industry-Specific</h3>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• Material estimators</li>
                    <li>• Carbon footprint</li>
                    <li>• Calorie counters</li>
                    <li>• Unit converters</li>
                  </ul>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Need a Custom Calculator?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build interactive calculators for pricing, quotes, ROI, or any formula your business needs. Help customers make decisions and capture leads.
              </p>
              <Button href="/contact" size="lg">
                Let's Build Yours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
