'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { CheckCircle, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: '',

    // Step 2: Requirements
    design: false,
    development: false,
    ecommerce: false,
    customSoftware: false,
    seo: false,
    maintenance: false,

    // Step 3: Project Details
    timeline: '',
    budget: '',
    hasContent: '',

    // Step 4: About You
    name: '',
    email: '',
    phone: '',
    company: '',

    // Step 5: Tell More
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    // Prepare quote data
    const quoteData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      projectType: formData.projectType,
      description: formData.description,
      timeline: formData.timeline,
      budget: formData.budget,
      services: {
        design: formData.design,
        development: formData.development,
        ecommerce: formData.ecommerce,
        customSoftware: formData.customSoftware,
        seo: formData.seo,
        maintenance: formData.maintenance,
      },
      hasContent: formData.hasContent,
    };

    // Send confirmation email
    try {
      await fetch('/api/send-quote-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }

    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setFormData({
        projectType: '',
        design: false,
        development: false,
        ecommerce: false,
        customSoftware: false,
        seo: false,
        maintenance: false,
        timeline: '',
        budget: '',
        hasContent: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        description: '',
      });
    }, 5000);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero + Form Combined */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Get Your <span className="text-gradient">Custom Quote</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Answer a few questions about your project and I will send you a detailed quote with transparent pricing and a clear timeline.
              </p>
            </MotionReveal>
          </div>

          {/* Quote Form */}
          <div className="max-w-3xl mx-auto">
            {!submitted ? (
              <>
                {/* Progress Bar */}
                <MotionReveal>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-text-secondary">
                        Step {step} of {totalSteps}
                      </span>
                      <span className="text-sm font-medium text-accent-primary">
                        {Math.round(progress)}% Complete
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </MotionReveal>

                {/* Form Steps */}
                <MotionReveal delay={0.1}>
                  <Card variant="elevated">
                    {/* Step 1: Project Type */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2">What type of project are you planning?</h2>
                          <p className="text-text-secondary text-sm mb-6">
                            This helps me understand the scope of your project.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {[
                            { value: 'new-website', label: 'New Website', description: 'Starting from scratch' },
                            { value: 'redesign', label: 'Website Redesign', description: 'Updating an existing site' },
                            { value: 'ecommerce', label: 'E-Commerce Store', description: 'Selling products online' },
                            { value: 'custom-software', label: 'Custom Software', description: 'Booking systems, portals, tools' },
                            { value: 'other', label: 'Something Else', description: 'Tell me more in later steps' },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                formData.projectType === option.value
                                  ? 'border-accent-primary bg-accent-primary/10'
                                  : 'border-white/10 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="radio"
                                name="projectType"
                                value={option.value}
                                checked={formData.projectType === option.value}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                  formData.projectType === option.value
                                    ? 'border-accent-primary'
                                    : 'border-white/30'
                                }`}>
                                  {formData.projectType === option.value && (
                                    <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium mb-1">{option.label}</div>
                                  <div className="text-sm text-text-secondary">{option.description}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Requirements */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2">What services do you need?</h2>
                          <p className="text-text-secondary text-sm mb-6">
                            Select all that apply. This helps me put together an accurate quote.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {[
                            { name: 'design', label: 'Web Design', description: 'Visual design and user experience' },
                            { name: 'development', label: 'Web Development', description: 'Building the actual website' },
                            { name: 'ecommerce', label: 'E-Commerce', description: 'Online shop functionality' },
                            { name: 'customSoftware', label: 'Custom Software', description: 'Booking systems, portals, calculators' },
                            { name: 'seo', label: 'SEO', description: 'Search engine optimization' },
                            { name: 'maintenance', label: 'Maintenance', description: 'Ongoing support and updates' },
                          ].map((service) => (
                            <label
                              key={service.name}
                              className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                formData[service.name as keyof typeof formData]
                                  ? 'border-accent-primary bg-accent-primary/10'
                                  : 'border-white/10 hover:border-white/20'
                              }`}
                            >
                              <input
                                type="checkbox"
                                name={service.name}
                                checked={!!formData[service.name as keyof typeof formData]}
                                onChange={handleCheckboxChange}
                                className="sr-only"
                              />
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                  formData[service.name as keyof typeof formData]
                                    ? 'border-accent-primary bg-accent-primary'
                                    : 'border-white/30'
                                }`}>
                                  {formData[service.name as keyof typeof formData] && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium mb-1">{service.label}</div>
                                  <div className="text-sm text-text-secondary">{service.description}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Project Details */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
                          <p className="text-text-secondary text-sm mb-6">
                            Tell me about your timeline and budget so I can plan accordingly.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">When do you need this completed?</label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          >
                            <option value="">Select a timeline...</option>
                            <option value="asap">As soon as possible</option>
                            <option value="1-2-months">1-2 months</option>
                            <option value="3-6-months">3-6 months</option>
                            <option value="flexible">Flexible / No rush</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">What is your budget range?</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          >
                            <option value="">Select budget range...</option>
                            <option value="under-1k">Under £1,000</option>
                            <option value="1k-2k">£1,000 - £2,000</option>
                            <option value="2k-5k">£2,000 - £5,000</option>
                            <option value="5k-10k">£5,000 - £10,000</option>
                            <option value="10k-25k">£10,000 - £25,000</option>
                            <option value="over-25k">Over £25,000</option>
                            <option value="not-sure">Not sure yet</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Do you have content ready?</label>
                          <p className="text-xs text-text-secondary mb-3">
                            This includes text, images, logos, and any other materials needed for the website.
                          </p>
                          <select
                            name="hasContent"
                            value={formData.hasContent}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          >
                            <option value="">Select an option...</option>
                            <option value="yes">Yes, content is ready</option>
                            <option value="partial">Some content ready</option>
                            <option value="no">No, need help with content</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 4: About You */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2">About You</h2>
                          <p className="text-text-secondary text-sm mb-6">
                            How can I reach you with your personalized quote?
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="07700 900000"
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Company Name (Optional)</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company Ltd"
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 5: Additional Info */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold mb-2">Tell Me More About Your Project</h2>
                          <p className="text-text-secondary text-sm mb-6">
                            Share any additional details that will help me understand your vision and requirements.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Description *</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={8}
                            placeholder="Describe your project, goals, target audience, features you need, or anything else you think is important..."
                            className="w-full px-4 py-3 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
                          />
                        </div>

                        <div className="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
                          <div className="text-sm text-text-secondary">
                            <strong className="text-text-primary">What happens after you submit?</strong>
                            <ul className="mt-2 space-y-1 ml-4 list-disc">
                              <li>I will review your requirements within 24 hours</li>
                              <li>You will receive a detailed quote via email</li>
                              <li>The quote will include pricing breakdown and timeline</li>
                              <li>We can schedule a call to discuss if needed</li>
                              <li>No obligation�"take your time to review</li>
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
                      {step < totalSteps ? (
                        <Button onClick={handleNext} variant="primary">
                          Next Step →
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
                  <h2 className="text-2xl font-semibold mb-2">Quote Request Submitted!</h2>
                  <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                    Thank you, {formData.name}. I have received your project details and will send you a personalized quote within 24 hours.
                  </p>
                  <div className="text-sm text-text-secondary space-y-2 mb-8">
                    <p>✓ Confirmation email sent to {formData.email}</p>
                    <p>✓ I will review your requirements and prepare a detailed quote</p>
                    <p>✓ Expect to hear back within 1 business day</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/" variant="primary">
                      Return Home
                    </Button>
                    <Button href="/projects" variant="secondary">
                      View My Work
                    </Button>
                  </div>
                </Card>
              </MotionReveal>
            )}
          </div>
        </Section>

        {/* Benefits Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Why Get a Quote?</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-sm text-text-secondary">
                    You will get a clear breakdown of costs with no hidden fees or surprise charges.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Realistic Timeline</h3>
                  <p className="text-sm text-text-secondary">
                    Get an honest estimate of how long your project will take from start to finish.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">No Obligation</h3>
                  <p className="text-sm text-text-secondary">
                    Review the quote at your own pace. No pressure to commit right away.
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
                Prefer to Talk First?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                If you would rather discuss your project before getting a quote, feel free to reach out directly.
              </p>
              <Button href="/contact" size="lg">
                Contact Me
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
