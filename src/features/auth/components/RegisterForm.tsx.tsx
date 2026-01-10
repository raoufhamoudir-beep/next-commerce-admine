import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { api } from "@/lib/axios";
import { registerSchema, type RegisterFormValues } from "../types/schema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  // 1. Setup React Hook Form with Zod Resolver
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreedToTerms: false },
    mode: "onChange" 
  });

  // 2. Handle Form Submission
  const onSubmit = async (data: RegisterFormValues) => {
    setIsRegistering(true);
    try {
      // Construct the payload (only sending necessary user data)
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        // The backend should handle default values for repoName/storeName/website 
        // if they are not provided in this initial step.
      };

      const res = await api.post("/auth/register", payload);

      if (res.data?.good || res.data?._id) {
        toast.success("تم إنشاء الحساب بنجاح! 🚀"); // Account created successfully
        navigate("/");
      } else {
        toast.error("حدث خطأ ما أثناء التسجيل"); // Generic error
      }
    } catch (e) {
      console.error(e);
      toast.error("فشل الاتصال بالسيرفر"); // Connection failed
    } finally {
      setIsRegistering(false);
    }
  };

  // Reusable input style class for consistency
  const inputClassName = (hasError: boolean) => `
    w-full rounded-xl border px-6 py-3 shadow-sm transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-teal-500
    ${hasError 
      ? 'border-red-500 text-red-900 focus:ring-red-500 placeholder-red-300' 
      : 'border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white'}
  `;

  return (
    <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 md:flex-row md:gap-16">
      <Toaster position="top-center" />
      
      {/* --- Language/Global Icon (Fixed Top Left) --- */}
      <div className="fixed top-5 left-5 z-50 cursor-pointer">
         <Globe size={30} className="text-teal-600 hover:rotate-12 transition-transform duration-300" />
      </div>

      {/* --- Left Side: Mascot/Branding (Desktop Only) --- */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="hidden max-w-sm md:block"
      >
         <img 
            src="/logo.png" 
            alt="Mascot" 
            className="rounded-full shadow-2xl transition-transform hover:scale-105 duration-500" 
            style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)" }} 
         />
      </motion.div>

      {/* --- Right Side: Form Container --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl md:mt-0"
      >
        {/* Mobile Logo (Hidden on Desktop) */}
        <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            src="/logo.png"
            className="mx-auto w-24 h-24 -mt-16 mb-6 block rounded-full drop-shadow-lg md:hidden bg-white p-1"
        />
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               
               {/* Header Section */}
               <div className="text-center mb-8">
                 <h2 className="mb-2 text-3xl font-extrabold text-purple-600 drop-shadow-sm">إنشاء حساب جديد</h2>
                 <p className="text-sm text-gray-500">أدخل بياناتك الشخصية للبدء</p>
               </div>
               
               {/* Inputs Section */}
               <div className="space-y-4">
                 {/* Name */}
                 <div>
                   <input 
                      {...register("name")} 
                      placeholder="الاسم الكامل" 
                      className={inputClassName(!!errors.name)} 
                   />
                   {errors.name && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.name.message}</p>}
                 </div>

                 {/* Phone */}
                 <div>
                   <input 
                      {...register("phone")} 
                      placeholder="رقم الهاتف" 
                      className={inputClassName(!!errors.phone)} 
                   />
                   {errors.phone && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.phone.message}</p>}
                 </div>

                 {/* Email */}
                 <div>
                   <input 
                      {...register("email")} 
                      placeholder="البريد الإلكتروني" 
                      className={inputClassName(!!errors.email)} 
                   />
                   {errors.email && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.email.message}</p>}
                 </div>

                 {/* Password */}
                 <div>
                   <input 
                      {...register("password")} 
                      type="password" 
                      placeholder="كلمة المرور" 
                      className={inputClassName(!!errors.password)} 
                   />
                   {errors.password && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.password.message}</p>}
                 </div>

                 {/* Confirm Password */}
                 <div>
                   <input 
                      {...register("confirmPassword")} 
                      type="password" 
                      placeholder="تأكيد كلمة المرور" 
                      className={inputClassName(!!errors.confirmPassword)} 
                   />
                   {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.confirmPassword.message}</p>}
                 </div>
               </div>

               {/* Terms & Conditions Checkbox */}
               <div className="flex items-center gap-3 mt-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <input 
                    type="checkbox" 
                    {...register("agreedToTerms")} 
                    id="terms" 
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer" 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                      أوافق على <Link to="/terms" className="text-teal-600 hover:text-teal-700 hover:underline font-semibold">الشروط والأحكام</Link>
                  </label>
               </div>
               {errors.agreedToTerms && <p className="text-red-500 text-xs mt-1 px-2 font-medium">{errors.agreedToTerms.message}</p>}

               {/* Submit Button */}
               <motion.button 
                  type="submit" 
                  disabled={isRegistering} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 py-3.5 font-bold text-white shadow-lg transition duration-300 hover:shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                  {isRegistering ? <Loader2 className="animate-spin mx-auto h-6 w-6" /> : 'إنشاء الحساب'}
               </motion.button>

            </motion.div>
        </form>
        
        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
           <span className="block">
               لديك حساب بالفعل؟ <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700 hover:underline transition-colors">تسجيل الدخول</Link>
           </span>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;