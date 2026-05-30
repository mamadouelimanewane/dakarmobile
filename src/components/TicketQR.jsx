import QRCode from "react-qr-code";

export default function TicketQR() {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-6 mt-6">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">Mon Billet QR</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        <QRCode value="SunuBus-Billet-12345" size={180} />
      </div>
      <p className="mt-3 text-sm text-gray-600">Présentez ce QR à l’agent de contrôle</p>
    </div>
  );
}
