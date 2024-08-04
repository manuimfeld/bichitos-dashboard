export default function Alert({ alert }) {
  if (!alert.visible) return null;

  return <div className={`alert ${alert.type}`}>{alert.message}</div>;
}
