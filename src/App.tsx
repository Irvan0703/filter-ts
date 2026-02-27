import {
  useLoaderData,
  useSearchParams,
  Form,
  useNavigate,
 type LoaderFunctionArgs,
} from "react-router-dom";
import { type RegionResponse } from "./types/region";

/**
 * Loader (Data Mode)
 */
export async function loader(_: LoaderFunctionArgs) {
  const res = await fetch("/data/indonesia_regions.json");
  const data: RegionResponse = await res.json();
  return data;
}

export default function FilterPage() {
  const { provinces, regencies, districts } =
    useLoaderData() as RegionResponse;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedProvince = searchParams.get("province") ?? "";
  const selectedRegency = searchParams.get("regency") ?? "";
  const selectedDistrict = searchParams.get("district") ?? "";

  const filteredRegencies = regencies.filter(
    (r) => r.province_id === selectedProvince
  );

  const filteredDistricts = districts.filter(
    (d) => d.regency_id === selectedRegency
  );

  const getProvinceName = () =>
    provinces.find((p) => p.id === selectedProvince)?.name;

  const getRegencyName = () =>
    regencies.find((r) => r.id === selectedRegency)?.name;

  const getDistrictName = () =>
    districts.find((d) => d.id === selectedDistrict)?.name;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white p-6 border-r">
        <h2 className="text-lg font-semibold mb-6">
          Filter Wilayah
        </h2>

        <Form method="get" className="space-y-4">
          {/* Province */}
          <select
            name="province"
            defaultValue={selectedProvince}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Regency */}
          <select
            name="regency"
            defaultValue={selectedRegency}
            disabled={!selectedProvince}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {filteredRegencies.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            name="district"
            defaultValue={selectedDistrict}
            disabled={!selectedRegency}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih Kecamatan</option>
            {filteredDistricts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Apply
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="border px-4 py-2 rounded w-full"
            >
              Reset
            </button>
          </div>
        </Form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <nav className="breadcrumb text-sm text-gray-500 mb-8">
          Indonesia
          {selectedProvince && ` > ${getProvinceName()}`}
          {selectedRegency && ` > ${getRegencyName()}`}
          {selectedDistrict && ` > ${getDistrictName()}`}
        </nav>

        <div className="text-center space-y-6">
          {selectedProvince && (
            <>
              <p className="text-gray-400 uppercase text-sm">
                Provinsi
              </p>
              <h1 className="text-4xl font-bold">
                {getProvinceName()}
              </h1>
            </>
          )}

          {selectedRegency && (
            <>
              <p className="text-gray-400 uppercase text-sm">
                Kota / Kabupaten
              </p>
              <h2 className="text-3xl font-semibold">
                {getRegencyName()}
              </h2>
            </>
          )}

          {selectedDistrict && (
            <>
              <p className="text-gray-400 uppercase text-sm">
                Kecamatan
              </p>
              <h3 className="text-2xl">
                {getDistrictName()}
              </h3>
            </>
          )}
        </div>
      </main>
    </div>
  );
}