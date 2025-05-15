import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  const submitHandler = (data: ContactFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-accent-800 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-accent-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="Your name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-accent-800 mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-accent-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="your.email@example.com"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email'
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-accent-800 mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={`w-full px-4 py-3 rounded-md border ${errors.subject ? 'border-red-500' : 'border-accent-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="What's this about?"
          {...register('subject', { required: 'Subject is required' })}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-accent-800 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-3 rounded-md border ${errors.message ? 'border-red-500' : 'border-accent-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="Let us know how we can help..."
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex justify-center items-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;