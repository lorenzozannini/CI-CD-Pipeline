interface UserAvatarProps {
  initials: string;
  color: string;
}

export function UserAvatar({ initials, color }: UserAvatarProps) {
  return (
    <div className="relative w-9 h-9 flex-shrink-0">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="text-white font-roboto font-medium text-base">
          {initials}
        </span>
      </div>
    </div>
  );
}
