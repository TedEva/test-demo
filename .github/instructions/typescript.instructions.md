---
applyTo: '**/*.ts'
---

# TypeScript 编码规范

## 一、基础规范

### 1. 文件命名
- 使用 **PascalCase** 命名组件文件：`UserProfile.tsx`
- 使用 **camelCase** 命名工具函数文件：`formatDate.ts`
- 使用 **kebab-case** 命名样式文件：`user-profile.css`
- 类型定义文件使用 **camelCase**：`userTypes.ts`

### 2. 导入导出规范
```typescript
// ✅ 推荐：使用 type 关键字导入类型
import type { User, UserRole } from './types';
import { getUserData } from './utils';

// ✅ 推荐：命名导出优于默认导出（除了组件）
export const formatUserName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

// ✅ 推荐：组件使用默认导出
export default function UserProfile({ user }: { user: User }) {
  return <div>{formatUserName(user)}</div>;
}
```

## 二、类型定义规范

### 1. 接口命名
```typescript
// ✅ 推荐：使用 PascalCase，避免 I 前缀
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ✅ 推荐：Props 接口以 Props 结尾
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}
```

### 2. 类型别名
```typescript
// ✅ 推荐：使用 PascalCase
type UserStatus = 'active' | 'inactive' | 'pending';
type UserRole = 'admin' | 'user' | 'guest';

// ✅ 推荐：复杂类型使用类型别名
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

### 3. 枚举
```typescript
// ✅ 推荐：使用 const assertion 替代枚举
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];
```

## 三、函数规范

### 1. 函数类型声明
```typescript
// ✅ 推荐：明确的返回类型
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ 推荐：异步函数
const fetchUser = async (id: string): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};
```

### 2. 事件处理器
```typescript
// ✅ 推荐：明确的事件类型
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault();
  // 处理逻辑
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  const { name, value } = event.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

## 四、React + TypeScript 规范

### 1. 组件定义
```typescript
// ✅ 推荐：函数组件使用 React.FC 或直接函数声明
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      {onEdit && (
        <button onClick={() => onEdit(user)}>
          编辑
        </button>
      )}
    </div>
  );
};

export default UserCard;
```

### 2. Hooks 使用
```typescript
// ✅ 推荐：明确的 state 类型
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [errors, setErrors] = useState<Record<string, string>>({});

// ✅ 推荐：useRef 类型声明
const inputRef = useRef<HTMLInputElement>(null);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);
```

### 3. 自定义 Hook
```typescript
// ✅ 推荐：自定义 Hook 类型定义
interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApi = <T>(url: string): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
```

## 五、最佳实践

### 1. 严格模式配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 2. 避免 any 类型
```typescript
// ❌ 避免使用 any
const processData = (data: any) => {
  return data.someProperty;
};

// ✅ 推荐：使用具体类型或泛型
const processData = <T extends { someProperty: unknown }>(data: T): T['someProperty'] => {
  return data.someProperty;
};
```

### 3. 类型守卫
```typescript
// ✅ 推荐：使用类型守卫
const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
};

// 使用示例
if (isUser(response.data)) {
  // 这里 response.data 被正确推断为 User 类型
  console.log(response.data.name);
}
```

### 4. 泛型约束
```typescript
// ✅ 推荐：使用泛型约束
interface Entity {
  id: string;
  createdAt: Date;
}

const updateEntity = <T extends Entity>(
  entity: T,
  updates: Partial<Omit<T, 'id' | 'createdAt'>>
): T => {
  return { ...entity, ...updates };
};
```

## 六、注释规范

### 1. JSDoc 注释
```typescript
/**
 * 计算购物车总价
 * @param items - 购物车商品列表
 * @param discountRate - 折扣率 (0-1)
 * @returns 计算后的总价
 */
const calculateCartTotal = (
  items: CartItem[],
  discountRate = 0
): number => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return subtotal * (1 - discountRate);
};
```

### 2. 复杂逻辑注释
```typescript
const processUserData = (rawData: unknown[]): User[] => {
  return rawData
    .filter(isUser) // 过滤出有效的用户数据
    .map(user => ({
      ...user,
      // 标准化邮箱格式
      email: user.email.toLowerCase().trim(),
      // 生成显示名称
      displayName: user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.email
    }));
};
```

## 七、错误处理

### 1. 自定义错误类型
```typescript
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 使用示例
const fetchUserData = async (id: string): Promise<User> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        'Failed to fetch user data',
        'USER_FETCH_ERROR'
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      // 处理 API 错误
      console.error(`API Error ${error.status}: ${error.message}`);
    } else {
      // 处理其他错误
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
```

---

## 总结

遵循这些编码规范可以提高代码的可读性、可维护性和类型安全性。记住：

1. **类型优先**：始终明确定义类型
2. **严格模式**：开启 TypeScript 严格模式
3. **避免 any**：尽量使用具体类型
4. **一致性**：保持命名和结构的一致性
5. **文档化**：为复杂逻辑添加注释