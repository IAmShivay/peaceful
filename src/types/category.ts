export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  isActive: boolean;
  sortOrder: number;
  soundCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCreate {
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  sortOrder?: number;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
  level: number;
}
