import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Store, Globe, Loader2, CheckCircle2, Upload, Palette, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. Updated Zod Schema ---
// We allow logo to be any (File) for the form, but in a real app you'd upload it to S3/Cloudinary first.
const formSchema = z.object({
  name: z.string().min(3, { message: "Store name must be at least 3 characters" }),
  subdomain: z
    .string()
    .min(3, { message: "Domain must be at least 3 characters" })
    .regex(/^[a-z0-9-]+$/, { message: "Only lowercase letters, numbers, and hyphens allowed" }),
  color: z.string().min(4, { message: "Please select a brand color" }),
  logo: z.any().optional(), 
});

type FormValues = z.infer<typeof formSchema>;

// Preset colors for the user to choose quickly
const BRAND_COLORS = [
  { name: 'Purple', value: '#9333ea' }, // Your preference
  { name: 'Teal', value: '#0d9488' },   // Your preference
  { name: 'Blue', value: '#2563eb' },
  { name: 'Black', value: '#0f172a' },
  { name: 'Orange', value: '#ea580c' },
];

const CreateStore = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubdomainTouched, setIsSubdomainTouched] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: '#9333ea', // Default to Purple
    },
    mode: 'onChange',
  });

  const watchedName = watch("name");
  const watchedColor = watch("color");

  // --- Auto-Slug Logic ---
  useEffect(() => {
    if (watchedName && !isSubdomainTouched) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setValue("subdomain", slug, { shouldValidate: true });
    }
  }, [watchedName, isSubdomainTouched, setValue]);

  // --- Logo Handling ---
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a fake URL for preview
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setValue("logo", file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setValue("logo", null);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Submitting:", data);
    // TODO: 
    // 1. Upload `data.logo` to storage (AWS S3/Uploadthing) -> get URL
    // 2. Send `name`, `subdomain`, `color`, and `logoUrl` to backend
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/admin" className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your store
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Customize your brand identity.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-purple-900/5 sm:rounded-2xl sm:px-10 border border-gray-100">
          
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            
            {/* --- 1. Store Details Section --- */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Store Details</h3>
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("name")}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="e.g. My Awesome Shop"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              {/* Subdomain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Domain</label>
                <div className="flex rounded-md shadow-sm">
                  <div className="relative flex-grow focus-within:z-10">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                     </div>
                    <input
                      {...register("subdomain")}
                      onInput={() => setIsSubdomainTouched(true)}
                      type="text"
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-l-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    .nextcommerce.com
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* --- 2. Branding Section --- */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Branding</h3>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                
                {!logoPreview ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 hover:border-purple-400 transition-all cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleLogoChange}
                    />
                    <div className="space-y-1 text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <Upload className="w-10 h-10 mx-auto" />
                      </div>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                          Upload a file
                        </span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-fit mt-2">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="h-24 w-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <button 
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Brand Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Primary Color</label>
                <div className="flex flex-wrap gap-3 items-center">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setValue('color', c.value)}
                      className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all ${
                        watchedColor === c.value 
                          ? 'border-gray-900 scale-110 shadow-md' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {watchedColor === c.value && (
                        <CheckCircle2 className="w-5 h-5 text-white mx-auto" />
                      )}
                    </button>
                  ))}
                  
                  {/* Custom Color Input Wrapper */}
                  <div className="relative">
                     <div className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center cursor-pointer overflow-hidden">
                       <Palette className="w-5 h-5 text-gray-400" />
                       <input 
                        type="color"
                        {...register("color")}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                       />
                     </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: <span className="font-mono uppercase">{watchedColor}</span>
                </p>
              </div>
            </div>

            {/* --- Submit --- */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-teal-500 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                   <>
                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                     Creating Store...
                   </>
                ) : (
                   "Create Store"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateStore;