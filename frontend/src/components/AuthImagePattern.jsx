// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//         <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 min-h-screen w-full">
//             <div className=" text-center">
//                 <div className="grid grid-cols-3 gap-3 mb-8 w-full">
//                     {[...Array(9)].map((_, i) => (
//             <div
//               key={i}
//               className={`h-20 w-20 rounded-2xl bg-blue-500/20 ${
//                 i % 2 === 0 ? 'animate-pulse' : ''
//               }`}
//             />
//           ))}
//                 </div>
//                 <h2 className="text-2xl font-bold mb-4">{title}</h2>
//                 <p className="text-base-content/60">{subtitle}</p>
//             </div>

//         </div>
//     )
// }

// export default AuthImagePattern

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 min-h-screen w-full overflow-auto">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Grid of boxes */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-20 h-20 rounded-xl bg-blue-500/20 ${
                i % 2 === 0 ? 'animate-pulse' : ''
              }`}
            />
          ))}
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
