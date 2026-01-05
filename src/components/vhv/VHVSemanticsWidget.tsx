import React from 'react';

interface VHVSemanticsProps {
  children: React.ReactNode;
  label?: string;
  hint?: string;
  value?: string;
  button?: boolean;
  enabled?: boolean;
  checked?: boolean;
  selected?: boolean;
  header?: boolean;
  textField?: boolean;
  readOnly?: boolean;
  focusable?: boolean;
  focused?: boolean;
  inMutuallyExclusiveGroup?: boolean;
  obscured?: boolean;
  multiline?: boolean;
  scopesRoute?: boolean;
  namesRoute?: boolean;
  hidden?: boolean;
  image?: boolean;
  liveRegion?: boolean;
  onTap?: () => void;
  onLongPress?: () => void;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onCopy?: () => void;
  onCut?: () => void;
  onPaste?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const VHVSemantics: React.FC<VHVSemanticsProps> = ({
  children,
  label,
  hint,
  value,
  button,
  enabled = true,
  checked,
  selected,
  header,
  textField,
  readOnly,
  focusable = true,
  focused,
  hidden,
  image,
  onTap,
  className = '',
}) => {
  const role = button ? 'button' : textField ? 'textbox' : header ? 'heading' : image ? 'img' : undefined;

  return (
    <div
      role={role}
      aria-label={label}
      aria-describedby={hint}
      aria-valuetext={value}
      aria-disabled={!enabled}
      aria-checked={checked}
      aria-selected={selected}
      aria-readonly={readOnly}
      aria-hidden={hidden}
      tabIndex={focusable ? 0 : -1}
      onClick={onTap}
      className={className}
    >
      {children}
    </div>
  );
};
