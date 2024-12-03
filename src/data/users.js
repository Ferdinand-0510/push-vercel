// D:\Carl\React\test\src\data\users.js
export const navItems = [
    {
        id: 1,
        title: "首頁",
        path: "/",
        requireAuth: false
    },
    {
        id: 2,
        title: "商品",
        path: "/page1",
        requireAuth: false
    },
    {
        id: 3,
        title: "購物車",
        path: "/page2",
        requireAuth: true  // 需要登入才能訪問
    },
    {
        id: 4,
        title: "關於我們",
        path: "/page3",
        requireAuth: false
    },
        {
        id: 5,
        title: "測試",
        path: "/NewData",
        requireAuth: false
    }
];

// 模擬用戶數據
export const users = [
    {
        id: 1,
        username: "test",
        password: "test123",
        name: "測試用戶"
    },
    {
        id: 2,
        username: "admin",
        password: "admin123",
        name: "管理員"
    }
];