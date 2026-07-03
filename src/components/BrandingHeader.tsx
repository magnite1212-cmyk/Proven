import React from 'react';

interface BrandingHeaderProps {
  clinicLogo?: string;
  clinicName?: string;
  showClinicBranding?: boolean;
}

export const BrandingHeader: React.FC<BrandingHeaderProps> = ({
  clinicLogo,
  clinicName,
  showClinicBranding = false
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {showClinicBranding && clinicLogo ? (
          /* Dual-Logo Registration Page Layout */
          <div className="flex items-center justify-center gap-6">
            {/* Proven Logo */}
            <div className="flex-shrink-0">
              <img
                src="/assets/proven-logo.png"
                alt="Proven"
                className="h-12 w-auto"
              />
            </div>
            
            {/* Partnership Symbol */}
            <div className="text-2xl text-gray-300">+</div>
            
            {/* Clinic Logo in Circle */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border-2 border-blue-200">
              <img
                src={clinicLogo}
                alt={clinicName}
                className="h-12 w-12 object-contain"
              />
            </div>
            
            {/* Clinic Name */}
            <div className="text-left">
              <p className="text-sm text-gray-500">Partner Clinic</p>
              <p className="text-lg font-semibold text-gray-900">{clinicName}</p>
            </div>
          </div>
        ) : (
          /* Standard Header with Proven Logo */
          <div className="flex items-center justify-center">
            <img
              src="/assets/proven-logo.png"
              alt="Proven"
              className="h-10 w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandingHeader;
