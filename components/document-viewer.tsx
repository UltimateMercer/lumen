// "use client";

// import type React from "react";

// interface DocumentViewerProps {
//   title: string;
//   classification?: string;
//   department: string;
//   content: React.ReactNode;
//   signedBy: string;
//   date: string;
// }

// export function DocumentViewer({
//   title,
//   classification,
//   department,
//   content,
//   signedBy,
//   date,
// }: DocumentViewerProps) {
//   return (
//     <div className="border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525]">
//       <div className="p-6">
//         <div className="dark:bg-[#eaeaea] bg-[#252525] p-4 mb-3 text-center">
//           <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea]">
//             REPÚBLICA DE ARCANUM
//           </div>
//           <div className="text-sm font-bold dark:text-[#121212] text-[#eaeaea]">
//             {department.toUpperCase()}
//           </div>
//         </div>

//         {classification && (
//           <div className="inline-block border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525] px-3 py-1 text-xs font-medium mb-4">
//             {classification}
//           </div>
//         )}
//         <h2 className="text-2xl font-bold text-foreground">{title}</h2>
//         <div className="text-xs text-muted-foreground mt-2">DATA: {date}</div>
//       </div>

//       <div className="p-6 space-y-4 text-sm leading-relaxed">{content}</div>

//       <div className="mt-8 dark:border-[#eaeaea] border-[#252525] p-6 bg-[#eaeaea] dark:bg-[#252525]">
//         <div className="text-xs text-muted-foreground mb-2">
//           DOCUMENTO AUTENTICADO E ASSINADO POR:
//         </div>
//         <div className="font-bold text-foreground">{signedBy}</div>
//         <div className="text-xs text-muted-foreground mt-4">
//           Este documento é propriedade da República de Arcanum e seu conteúdo é
//           protegido por lei.
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";

interface DocumentViewerProps {
  title: string;
  classification?: string;
  department: string;
  content: React.ReactNode;
  signedBy: string;
  date: string;
}

export function DocumentViewer({
  title,
  classification,
  department,
  content,
  signedBy,
  date,
}: DocumentViewerProps) {
  return <>{content}</>;
}
