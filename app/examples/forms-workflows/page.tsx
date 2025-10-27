'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { FileText, Send, CheckCircle, ArrowRight, User, Mail, Phone, Building } from 'lucide-react';
import { useState } from 'react';

export default function FormsWorkflowsDemoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-gradient">Forms & Workflows</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try a multi-step form with workflow automation. See how custom forms can collect data, validate inputs, and process information automatically.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-3xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Project Request Form</h2>
                <p className="text-text-secondary">Demo: Multi-Step Contact Form</p>
              </div>
            </MotionReveal>

            {!submitted ? (
              <>
                {/* Progress Indicator */}
                <MotionReveal delay={0.1}>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            s < step ? 'bg-accent-primary text-white' :
                            s === step ? 'bg-accent-primary text-white' :
                            'bg-white/10 text-text-secondary'
                          }`}>
                            {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                          </div>
                          {s < 3 && (
                            <div className={`flex-1 h-1 mx-2 ${
                              s < step ? 'bg-accent-primary' : 'bg-white/10'
                            }`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={step >= 1 ? 'text-text-primary' : 'text-text-secondary'}>Contact Info</span>
                      <span className={step >= 2 ? 'text-text-primary' : 'text-text-secondary'}>Project Details</span>
                      <span className={step >= 3 ? 'text-text-primary' : 'text-text-secondary'}>Additional Info</span>
                    </div>
                  </div>
                </MotionReveal>

                {/* Form Steps */}
                <MotionReveal delay={0.2}>
                  <Card variant="elevated">
                    {/* Step 1 */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Your Contact Information</h3>

                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Smith"
                              className="w-full pl-12 pr-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@company.com"
                              className="w-full pl-12 pr-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+44 7700 900000"
                              className="w-full pl-12 pr-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Company Name</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your Company Ltd"
                              className="w-full pl-12 pr-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Project Details</h3>

                        <div>
                          <label className="block text-sm font-medium mb-2">Service Type *</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          >
                            <option value="">Select a service...</option>
                            <option value="web-design">Web Design</option>
                            <option value="web-development">Web Development</option>
                            <option value="ecommerce">E-Commerce</option>
                            <option value="custom-software">Custom Software</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Budget Range *</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          >
                            <option value="">Select budget range...</option>
                            <option value="under-5k">Under £5,000</option>
                            <option value="5k-10k">£5,000 - £10,000</option>
                            <option value="10k-25k">£10,000 - £25,000</option>
                            <option value="over-25k">Over £25,000</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">Tell Us More</h3>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Description *</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Tell us about your project, goals, and timeline..."
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
                          />
                        </div>

                        <div className="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
                          <div className="text-sm text-text-secondary">
                            <strong className="text-text-primary">What happens next?</strong>
                            <ul className="mt-2 space-y-1 ml-4 list-disc">
                              <li>You'll receive an instant email confirmation</li>
                              <li>I'll review your request within 24 hours</li>
                              <li>I'll send you a personalized quote and timeline</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                      <Button
                        onClick={handleBack}
                        variant="ghost"
                        disabled={step === 1}
                      >
                        ← Back
                      </Button>
                      {step < 3 ? (
                        <Button onClick={handleNext} variant="primary">
                          Next →
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} variant="primary">
                          Submit Request
                          <Send className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                </MotionReveal>
              </>
            ) : (
              <MotionReveal>
                <Card variant="elevated" className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Request Submitted!</h3>
                  <p className="text-text-secondary mb-4">
                    Thank you, {formData.name}. We've received your project request.
                  </p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>✓ Confirmation email sent to {formData.email}</p>
                    <p>✓ Notification sent to project team</p>
                    <p>✓ You'll hear back within 24 hours</p>
                  </div>
                </Card>
              </MotionReveal>
            )}
          </div>
        </Section>

        {/* Features Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">What This Demo Shows</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Multi-Step Forms</h3>
                  <p className="text-sm text-text-secondary">
                    Break long forms into manageable steps with progress tracking.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Custom Fields</h3>
                  <p className="text-sm text-text-secondary">
                    Collect exactly the information you need with conditional logic and validation.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Workflow Automation</h3>
                  <p className="text-sm text-text-secondary">
                    Auto-send emails, create tasks, update databases, and trigger actions on submission.
                  </p>
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
                Need Custom Forms?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build forms and workflows for applications, surveys, bookings, approvals�"anything that collects and processes data for your business.
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
