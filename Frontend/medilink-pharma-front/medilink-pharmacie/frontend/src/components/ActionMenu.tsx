import React, { useEffect, useRef } from 'react';

interface ActionMenuProps {
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function ActionMenu({ onClose, onAction }: ActionMenuProps): React.JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const actions = [
    { id: 'export', label: 'Exporter PDF', icon: 'picture_as_pdf' },
    { id: 'report', label: 'Signaler un litige', icon: 'report_problem', color: 'text-rose-600' },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute top-12 right-0 w-56 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-slate-100/50 z-[60] py-4 animate-in fade-in zoom-in duration-200 origin-top-right"
    >
      <div className="px-5 mb-2">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Actions Archive</p>
      </div>
      <div className="space-y-1 px-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              onAction(action.id);
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group ${action.color || 'text-slate-600 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">{action.icon}</span>
            <span className="text-[11px] font-black uppercase tracking-widest">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
