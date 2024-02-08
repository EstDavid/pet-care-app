export default function StayConfirmed({ confirmed }: { confirmed: Boolean }) {
  if (confirmed) {
    return (
      <p className="bg-brand-bg-300 text-brand-bg-50 text-center px-2 rounded-full">
        CONFIRMED
      </p>
    );
  }

  return (
    <p className="bg-brand-fg-300 text-brand-fg-900 text-center px-2 rounded-full">
      PENDING
    </p>
  );
}
