"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/lib/api";
import toast from "react-hot-toast";
import QRCard from "@/components/QRCard";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;
  const mobileRegex = /^[6-9][0-9]{9}$/;

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Enter your name");
      return;
    }

    if (!mobileRegex.test(mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    if (!vehicleRegex.test(vehicleNumber)) {
      toast.error("Invalid vehicle number");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/vehicles/register", {
        ownerName: name,
        ownerMobile: mobile,
        vehicleNumber,
      });

      setQrImage(res.data.qrImage);
      toast.success("QR Generated!");
    } catch (err) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Register Vehicle</h1>

      <Input
        value={name}
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />

      <Input
        value={mobile}
        placeholder="Mobile Number"
        onChange={(e) => setMobile(e.target.value)}
        className="mb-3"
      />

      <Input
        value={vehicleNumber}
        placeholder="Vehicle Number (DL8CAS6880)"
        onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
        className="mb-3"
      />

      <Button onClick={handleRegister} className="w-full mt-2">
        {loading ? "Generating..." : "Generate QR Code"}
      </Button>

      {qrImage && (
        <div className="mt-8">
          <QRCard vehicleNumber={vehicleNumber} qrImage={qrImage} />
        </div>
      )}
    </div>
  );
}