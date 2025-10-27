'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BookingSystemsDemoPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);

  const services = [
    { id: '1', name: 'Haircut', duration: '30 min', price: '£25' },
    { id: '2', name: 'Hair Styling', duration: '45 min', price: '£40' },
    { id: '3', name: 'Color Treatment', duration: '90 min', price: '£80' },
  ];

  const dates = [
    'Mon, Oct 28',
    'Tue, Oct 29',
    'Wed, Oct 30',
    'Thu, Oct 31',
    'Fri, Nov 1',
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30',
  ];

  const handleBooking = () => {
    setBookingComplete(true);
    setTimeout(() => {
      setBookingComplete(false);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 3000);
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
                <span className="text-gradient">Booking System</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try out a live booking system demo. Click through to see how customers can book appointments online with automatic scheduling and confirmations.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Book an Appointment</h2>
                <p className="text-text-secondary">Demo: Hair Salon Booking System</p>
              </div>
            </MotionReveal>

            {!bookingComplete ? (
              <div className="space-y-8">
                {/* Step 1: Select Service */}
                <MotionReveal delay={0.1}>
                  <Card variant="elevated">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-semibold text-sm">
                        1
                      </div>
                      <h3 className="text-xl font-semibold">Select Service</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedService === service.id
                              ? 'border-accent-primary bg-accent-primary/10'
                              : 'border-white/10 hover:border-white/20 bg-bg-secondary'
                          }`}
                        >
                          <div className="font-semibold mb-1">{service.name}</div>
                          <div className="text-sm text-text-secondary">{service.duration}</div>
                          <div className="text-accent-primary font-semibold mt-2">{service.price}</div>
                        </button>
                      ))}
                    </div>
                  </Card>
                </MotionReveal>

                {/* Step 2: Select Date */}
                {selectedService && (
                  <MotionReveal delay={0.2}>
                    <Card variant="elevated">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-semibold text-sm">
                          2
                        </div>
                        <h3 className="text-xl font-semibold">Choose Date</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {dates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedDate === date
                                ? 'border-accent-primary bg-accent-primary/10'
                                : 'border-white/10 hover:border-white/20 bg-bg-secondary'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm font-medium">{date}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Card>
                  </MotionReveal>
                )}

                {/* Step 3: Select Time */}
                {selectedService && selectedDate && (
                  <MotionReveal delay={0.3}>
                    <Card variant="elevated">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white font-semibold text-sm">
                          3
                        </div>
                        <h3 className="text-xl font-semibold">Pick Time</h3>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedTime === time
                                ? 'border-accent-primary bg-accent-primary/10'
                                : 'border-white/10 hover:border-white/20 bg-bg-secondary'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-sm font-medium">{time}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Card>
                  </MotionReveal>
                )}

                {/* Confirm Booking Button */}
                {selectedService && selectedDate && selectedTime && (
                  <MotionReveal delay={0.4}>
                    <div className="text-center">
                      <Button onClick={handleBooking} size="lg">
                        Confirm Booking
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </MotionReveal>
                )}
              </div>
            ) : (
              <MotionReveal>
                <Card variant="elevated" className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Booking Confirmed!</h3>
                  <p className="text-text-secondary mb-4">
                    Your appointment has been scheduled for {selectedDate} at {selectedTime}
                  </p>
                  <p className="text-sm text-text-secondary">
                    A confirmation email has been sent with all the details.
                  </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Service Selection</h3>
                  <p className="text-sm text-text-secondary">
                    Customers choose from your services with pricing and duration displayed clearly.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Real-Time Availability</h3>
                  <p className="text-sm text-text-secondary">
                    Only available dates and time slots are shown, preventing double-bookings.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Instant Confirmation</h3>
                  <p className="text-sm text-text-secondary">
                    Immediate booking confirmation with automatic email notifications.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.4}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Mobile-Friendly</h3>
                  <p className="text-sm text-text-secondary">
                    Works perfectly on phones, tablets, and desktops for easy booking anywhere.
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
                Need a Booking System Like This?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build a custom booking system tailored to your business—with calendar syncing, payment processing, automated reminders, and whatever features you need.
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
