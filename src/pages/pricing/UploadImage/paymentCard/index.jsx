const PaymentCard = () => {
  return (
    <div className="max-w-xs mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-12 bg-gray-200 rounded">
            <img src="images/logo-bca.png" className="w-24 h-12" alt="" />
          </div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
        <div className="mb-6">
          <div className="text-gray-600 text-sm">Nama Pemilik</div>
          <div className="h-6 bg-gray-200 rounded">Agil Alfandi</div>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="text-gray-600 text-sm">Nomor Rekening</div>
          <div className="h-6 w-32 bg-gray-200 rounded text-center">
            7391187561
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
