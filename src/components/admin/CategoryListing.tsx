"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Home, Loader2 } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryListing() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const limit = 12;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchCategories = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);

      const response = await fetch(`/api/category?${params}`);
      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
        setCurrentPage(data.pagination.currentPage);
      } else {
        setNotification({
          message: data.error || "Failed to fetch categories",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setNotification({ message: "Failed to fetch categories", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage, searchQuery);
  }, [currentPage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      const url = editingCategory
        ? `/api/category/${editingCategory._id}`
        : "/api/category";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setNotification({
          message: editingCategory
            ? "Category updated successfully"
            : "Category created successfully",
          type: "success",
        });
        setIsModalOpen(false);
        setFormData({ name: "" });
        setEditingCategory(null);
        fetchCategories(currentPage, searchQuery);
      } else {
        setNotification({
          message: data.error || "Operation failed",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving category:", error);
      setNotification({ message: "Operation failed", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"?`)) return;

    setDeleting(categoryId);
    try {
      const response = await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setNotification({
          message: "Category deleted successfully",
          type: "success",
        });
        fetchCategories(currentPage, searchQuery);
      } else {
        setNotification({
          message: data.error || "Failed to delete category",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setNotification({ message: "Failed to delete category", type: "error" });
    } finally {
      setDeleting(null);
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "" });
  };

  const renderCategoryCards = () => {
    if (loading) {
      return (
        <div className="col-span-full flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#A97C52]" />
          <span className="ml-3 text-gray-500">Loading categories...</span>
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <div className="col-span-full text-center py-20 text-gray-500">
          No categories found
        </div>
      );
    }

    return categories.map((category) => (
      <div
        key={category._id}
        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        {/* Category Icon and Name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              Manage {category.name.toLowerCase()} furniture and accessories
              with premium quality standards
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#A97C51] flex items-center justify-center">
              <Home className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-4">
          <button
            onClick={() => handleEdit(category)}
            disabled={deleting === category._id}
            className="flex-1 px-6 py-3 bg-[#A97C51] text-white font-semibold rounded-full hover:bg-[#A97C52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(category._id, category.name)}
            disabled={deleting === category._id}
            className="flex-1 px-6 py-3 bg-white border-2 border-[#A97C51] text-[#A97C51] font-semibold rounded-full hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {deleting === category._id ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
          Created: {new Date(category.createdAt).toLocaleDateString()}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#A97C52] text-white font-semibold rounded-full hover:bg-amber-900 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderCategoryCards()}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-md">
          <p className="text-sm text-gray-700">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, total)} of {total} categories
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm font-semibold text-[#A97C52]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter category name"
                  required
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 bg-white border-2 border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-[#A97C52] text-white rounded-full text-sm font-semibold hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting
                  ? "Saving..."
                  : editingCategory
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
