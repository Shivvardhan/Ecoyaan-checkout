"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { MapPin, User, Mail, Phone, ArrowLeft } from "lucide-react";

const shippingSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "PIN code must be 6 digits"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function ShippingForm() {
  const { setStep, setShippingDetails, shippingDetails } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingDetails || {}, // Pre-fill if the user goes back from payment
    mode: "onChange",
  });

  const onSubmit = (data: ShippingFormData) => {
    setShippingDetails(data);
    setStep(2); // Move to Payment Review
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Shipping Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              {...register("fullName")}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                {...register("email")}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                {...register("phone")}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                placeholder="9876543210"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* PIN Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
            <input
              {...register("pinCode")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              placeholder="110001"
            />
            {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              {...register("city")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* State */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              {...register("state")}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => setStep(0)}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`flex-[2] py-3 rounded-xl font-bold text-white transition-all ${
              isValid ? "bg-green-700 hover:bg-green-800" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}