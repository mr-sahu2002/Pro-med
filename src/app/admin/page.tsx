import { ProductForm } from "@/components/admin/product-form";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage your products here.</p>
      <ProductForm />
    </div>
  );
}
