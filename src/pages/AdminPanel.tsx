import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Save, X, Settings, Database, Newspaper, Zap } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id?: string;
  title: string;
  description: string;
  url: string;
  category: string;
  source: string;
  image_url?: string;
  tags?: string[];
  published_date: string;
}

interface GadgetItem {
  id?: string;
  name: string;
  category: string;
  description?: string;
  brand?: string;
  price_usd?: number;
  price_inr?: number;
  rating?: number;
  image_url?: string;
  product_url?: string;
  tags?: string[];
  availability_india?: boolean;
  release_date?: string;
}

const AdminPanel = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [gadgetItems, setGadgetItems] = useState<GadgetItem[]>([]);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingGadget, setEditingGadget] = useState<GadgetItem | null>(null);
  const [newNews, setNewNews] = useState<NewsItem>({
    title: "",
    description: "",
    url: "",
    category: "",
    source: "",
    published_date: new Date().toISOString()
  });
  const [newGadget, setNewGadget] = useState<GadgetItem>({
    name: "",
    category: "",
    description: "",
    brand: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch news
      const { data: news, error: newsError } = await supabase
        .from('tech_news')
        .select('*')
        .order('published_date', { ascending: false });

      if (newsError) throw newsError;
      setNewsItems(news || []);

      // Fetch gadgets
      const { data: gadgets, error: gadgetsError } = await supabase
        .from('smart_gadgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (gadgetsError) throw gadgetsError;
      setGadgetItems(gadgets || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNews = async (item: NewsItem) => {
    try {
      if (item.id) {
        // Update existing
        const { error } = await supabase
          .from('tech_news')
          .update(item)
          .eq('id', item.id);
        
        if (error) throw error;
        toast.success('News updated successfully');
      } else {
        // Create new
        const { error } = await supabase
          .from('tech_news')
          .insert([item]);
        
        if (error) throw error;
        toast.success('News created successfully');
      }
      
      fetchData();
      setEditingNews(null);
      setNewNews({
        title: "",
        description: "",
        url: "",
        category: "",
        source: "",
        published_date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error('Failed to save news');
    }
  };

  const handleSaveGadget = async (item: GadgetItem) => {
    try {
      if (item.id) {
        // Update existing
        const { error } = await supabase
          .from('smart_gadgets')
          .update(item)
          .eq('id', item.id);
        
        if (error) throw error;
        toast.success('Gadget updated successfully');
      } else {
        // Create new
        const { error } = await supabase
          .from('smart_gadgets')
          .insert([item]);
        
        if (error) throw error;
        toast.success('Gadget created successfully');
      }
      
      fetchData();
      setEditingGadget(null);
      setNewGadget({
        name: "",
        category: "",
        description: "",
        brand: ""
      });
    } catch (error) {
      console.error('Error saving gadget:', error);
      toast.error('Failed to save gadget');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    
    try {
      const { error } = await supabase
        .from('tech_news')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('News deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete news');
    }
  };

  const handleDeleteGadget = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gadget?')) return;
    
    try {
      const { error } = await supabase
        .from('smart_gadgets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Gadget deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting gadget:', error);
      toast.error('Failed to delete gadget');
    }
  };

  const NewsForm = ({ item, onChange, onSave, onCancel }: {
    item: NewsItem;
    onChange: (item: NewsItem) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          {item.id ? 'Edit News' : 'Add News'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Title"
          value={item.title}
          onChange={(e) => onChange({ ...item, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
        <Input
          placeholder="URL"
          value={item.url}
          onChange={(e) => onChange({ ...item, url: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Category"
            value={item.category}
            onChange={(e) => onChange({ ...item, category: e.target.value })}
          />
          <Input
            placeholder="Source"
            value={item.source}
            onChange={(e) => onChange({ ...item, source: e.target.value })}
          />
        </div>
        <Input
          placeholder="Image URL"
          value={item.image_url || ""}
          onChange={(e) => onChange({ ...item, image_url: e.target.value })}
        />
        <Input
          type="datetime-local"
          value={item.published_date.slice(0, 16)}
          onChange={(e) => onChange({ ...item, published_date: new Date(e.target.value).toISOString() })}
        />
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const GadgetForm = ({ item, onChange, onSave, onCancel }: {
    item: GadgetItem;
    onChange: (item: GadgetItem) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {item.id ? 'Edit Gadget' : 'Add Gadget'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Name"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Category"
            value={item.category}
            onChange={(e) => onChange({ ...item, category: e.target.value })}
          />
          <Input
            placeholder="Brand"
            value={item.brand || ""}
            onChange={(e) => onChange({ ...item, brand: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="Description"
          value={item.description || ""}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Price USD"
            type="number"
            value={item.price_usd || ""}
            onChange={(e) => onChange({ ...item, price_usd: parseFloat(e.target.value) || undefined })}
          />
          <Input
            placeholder="Price INR"
            type="number"
            value={item.price_inr || ""}
            onChange={(e) => onChange({ ...item, price_inr: parseFloat(e.target.value) || undefined })}
          />
        </div>
        <Input
          placeholder="Image URL"
          value={item.image_url || ""}
          onChange={(e) => onChange({ ...item, image_url: e.target.value })}
        />
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <Settings className="inline-block mr-3 h-12 w-12" />
            Admin Panel
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage dKloud content manually without coding
          </p>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Tech News
            </TabsTrigger>
            <TabsTrigger value="gadgets" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Smart Gadgets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Tech News Management</span>
                  <Button onClick={() => setEditingNews(newNews)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add News
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>

            {editingNews && (
              <NewsForm
                item={editingNews}
                onChange={setEditingNews}
                onSave={() => handleSaveNews(editingNews)}
                onCancel={() => setEditingNews(null)}
              />
            )}

            <div className="grid gap-4">
              {newsItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="mt-2">{item.description}</CardDescription>
                        <div className="flex gap-2 mt-3">
                          <Badge>{item.category}</Badge>
                          <Badge variant="outline">{item.source}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNews(item)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNews(item.id!)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gadgets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Smart Gadgets Management</span>
                  <Button onClick={() => setEditingGadget(newGadget)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Gadget
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>

            {editingGadget && (
              <GadgetForm
                item={editingGadget}
                onChange={setEditingGadget}
                onSave={() => handleSaveGadget(editingGadget)}
                onCancel={() => setEditingGadget(null)}
              />
            )}

            <div className="grid gap-4">
              {gadgetItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-2">{item.description}</CardDescription>
                        <div className="flex gap-2 mt-3">
                          <Badge>{item.category}</Badge>
                          {item.brand && <Badge variant="outline">{item.brand}</Badge>}
                          {item.price_inr && <Badge variant="secondary">₹{item.price_inr}</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingGadget(item)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGadget(item.id!)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;