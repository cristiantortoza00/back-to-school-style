import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Package, FolderOpen, Upload, ImageIcon } from "lucide-react";
import { useProducts, type CategoryItem } from "@/context/ProductsContext";
import { type Product, type Category, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

// ─── Product Form ────────────────────────────────────────────
interface ProductFormData {
  name: string;
  description: string;
  image: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
  category: Category;
  visible: boolean;
}

const emptyProduct: ProductFormData = {
  name: "",
  description: "",
  image: "",
  price: 0,
  oldPrice: null,
  badge: null,
  category: "cuadernos",
  visible: true,
};

const ProductFormModal = ({
  open,
  onClose,
  initial,
  categories,
  onSave,
  title,
}: {
  open: boolean;
  onClose: () => void;
  initial: ProductFormData;
  categories: CategoryItem[];
  onSave: (data: ProductFormData) => void;
  title: string;
}) => {
  const [form, setForm] = useState<ProductFormData>(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB max
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim() || form.price <= 0) return;
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Completá los campos del producto.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {/* Image upload */}
          <div className="grid gap-2">
            <Label>Imagen del producto</Label>
            <div
              className="relative border-2 border-dashed border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors group"
              onClick={() => fileInputRef.current?.click()}
            >
              {form.image ? (
                <div className="aspect-video relative">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-primary-foreground font-bold text-sm bg-foreground/60 px-3 py-1.5 rounded-lg transition-opacity">
                      Cambiar imagen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-medium">Hacé click para subir una imagen</span>
                  <span className="text-xs">JPG, PNG o WEBP (máx. 5MB)</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Nombre</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre del producto" />
          </div>
          <div className="grid gap-2">
            <Label>Descripción</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descripción" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Categoría</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Badge (etiqueta)</Label>
              <Input value={form.badge ?? ""} onChange={(e) => setForm({ ...form, badge: e.target.value || null })} placeholder="Ej: 20% OFF" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Precio</Label>
              <Input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="0" />
            </div>
            <div className="grid gap-2">
              <Label>Precio anterior (descuento)</Label>
              <Input
                type="number"
                value={form.oldPrice ?? ""}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="Opcional"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} id="visible" />
            <Label htmlFor="visible">Visible en la tienda</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Delete Confirm Modal ────────────────────────────────────
const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  name,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Eliminar</DialogTitle>
        <DialogDescription>¿Estás seguro de que querés eliminar <strong>{name}</strong>? Esta acción no se puede deshacer.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button variant="destructive" onClick={() => { onConfirm(); onClose(); }}>Eliminar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// ─── Category Form Modal ─────────────────────────────────────
const CategoryFormModal = ({
  open,
  onClose,
  initial,
  onSave,
  title,
}: {
  open: boolean;
  onClose: () => void;
  initial: string;
  onSave: (name: string) => void;
  title: string;
}) => {
  const [name, setName] = useState(initial);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Ingresá el nombre de la categoría.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la categoría" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Admin Page ──────────────────────────────────────────────
const AdminPage = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory } = useProducts();
  const { toast } = useToast();

  const [productModal, setProductModal] = useState<{ open: boolean; product?: Product }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string; name: string } | null>(null);
  const [catModal, setCatModal] = useState<{ open: boolean; category?: CategoryItem }>({ open: false });
  const [deleteCatModal, setDeleteCatModal] = useState<{ open: boolean; id: Category; name: string } | null>(null);

  const handleSaveProduct = (data: ProductFormData) => {
    if (productModal.product) {
      updateProduct(productModal.product.id, data);
      toast({ title: "Producto actualizado" });
    } else {
      addProduct(data);
      toast({ title: "Producto agregado" });
    }
  };

  const handleSaveCategory = (name: string) => {
    if (catModal.category) {
      updateCategory(catModal.category.id, name);
      toast({ title: "Categoría actualizada" });
    } else {
      addCategory(name);
      toast({ title: "Categoría agregada" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-6">Panel de Administración</h1>

        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products" className="gap-2"><Package className="w-4 h-4" /> Productos</TabsTrigger>
            <TabsTrigger value="categories" className="gap-2"><FolderOpen className="w-4 h-4" /> Categorías</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">{products.length} productos</p>
              <Button onClick={() => setProductModal({ open: true })} className="gap-2">
                <Plus className="w-4 h-4" /> Agregar Producto
              </Button>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead className="hidden sm:table-cell">Descuento</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/40 shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {categories.find((c) => c.id === p.category)?.label ?? p.category}
                      </TableCell>
                      <TableCell className="font-semibold">{formatPrice(p.price)}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {p.oldPrice ? (
                          <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">{p.badge}</span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setProductModal({ open: true, product: p })}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteModal({ open: true, id: p.id, name: p.name })}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">{categories.length} categorías</p>
              <Button onClick={() => setCatModal({ open: true })} className="gap-2">
                <Plus className="w-4 h-4" /> Agregar Categoría
              </Button>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="text-muted-foreground text-sm font-mono">{c.id}</TableCell>
                      <TableCell className="font-medium">{c.label}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setCatModal({ open: true, category: c })}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteCatModal({ open: true, id: c.id, name: c.label })}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />

      {/* Modals */}
      {productModal.open && (
        <ProductFormModal
          open
          onClose={() => setProductModal({ open: false })}
          initial={
            productModal.product
              ? { name: productModal.product.name, description: productModal.product.description, image: productModal.product.image, price: productModal.product.price, oldPrice: productModal.product.oldPrice, badge: productModal.product.badge, category: productModal.product.category, visible: true }
              : emptyProduct
          }
          categories={categories}
          onSave={handleSaveProduct}
          title={productModal.product ? "Editar Producto" : "Agregar Producto"}
        />
      )}

      {deleteModal?.open && (
        <DeleteModal
          open
          onClose={() => setDeleteModal(null)}
          onConfirm={() => { deleteProduct(deleteModal.id); toast({ title: "Producto eliminado" }); }}
          name={deleteModal.name}
        />
      )}

      {catModal.open && (
        <CategoryFormModal
          open
          onClose={() => setCatModal({ open: false })}
          initial={catModal.category?.label ?? ""}
          onSave={handleSaveCategory}
          title={catModal.category ? "Editar Categoría" : "Agregar Categoría"}
        />
      )}

      {deleteCatModal?.open && (
        <DeleteModal
          open
          onClose={() => setDeleteCatModal(null)}
          onConfirm={() => { deleteCategory(deleteCatModal.id); toast({ title: "Categoría eliminada" }); }}
          name={deleteCatModal.name}
        />
      )}
    </div>
  );
};

export default AdminPage;
