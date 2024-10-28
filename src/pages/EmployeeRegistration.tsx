import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { Employee } from '../types/employee';
import { createEmployee } from '../lib/database';

type EmployeeFormData = Omit<Employee, 'id' | 'created_at'>;

export function EmployeeRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      await createEmployee(data);
      navigate('/employees');
    } catch (error) {
      console.error('Error registering employee:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to register employee. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Register New Employee</h1>
      {submitError && (
        <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md">
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            {...register('company_name', { required: 'Company name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.company_name && (
            <span className="text-red-500 text-sm">{errors.company_name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register('full_name', { required: 'Full name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.full_name && (
            <span className="text-red-500 text-sm">{errors.full_name.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            {...register('department', { required: 'Department is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.department && (
            <span className="text-red-500 text-sm">{errors.department.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            {...register('position', { required: 'Position is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.position && (
            <span className="text-red-500 text-sm">{errors.position.message}</span>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2
            `}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Registering...
              </>
            ) : (
              'Register Employee'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}