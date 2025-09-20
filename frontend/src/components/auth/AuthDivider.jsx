import React from 'react'

const AuthDivider = ({ text = 'or' }) => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white/80 backdrop-blur-sm px-4 py-1 text-slate-500 font-medium rounded-full">
          {text}
        </span>
      </div>
    </div>
  )
}

export default AuthDivider