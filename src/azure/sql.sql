USE [CarlWeb]
GO
/****** Object:  Table [dbo].[About_Us]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[About_Us](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[Customer_Uuid] [varchar](36) NOT NULL,
	[Title] [varchar](200) NULL,
	[Content] [text] NULL,
	[Image_Url] [varchar](255) NULL,
	[Status] [tinyint] NULL,
	[Created_Ut] [datetime] NULL,
	[Updated_Ut] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CompanyName] [varchar](100) NOT NULL,
	[CompanyCode] [varchar](20) NULL,
	[ContactPerson] [varchar](50) NULL,
	[ContactEmail] [varchar](100) NULL,
	[ContactPhone] [varchar](20) NULL,
	[Status] [tinyint] NULL,
	[SubscriptionLevel] [varchar](20) NULL,
	[SubscriptionStartDate] [date] NULL,
	[SubscriptionEndDate] [date] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HomeData]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HomeData](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[Title] [varchar](100) NOT NULL,
	[TitleImg] [varchar](100) NULL,
	[IsDel] [bit] NULL,
	[Title_Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Languages]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Languages](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](10) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[IsDefault] [bit] NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Media]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Media](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[Type] [varchar](10) NOT NULL,
	[Title] [varchar](200) NULL,
	[Description] [text] NULL,
	[Url] [varchar](255) NOT NULL,
	[ThumbnailUrl] [varchar](255) NULL,
	[SortOrder] [int] NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[News]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[Customer_Uuid] [varchar](36) NOT NULL,
	[Title] [varchar](200) NOT NULL,
	[Content] [text] NULL,
	[Image_Url] [varchar](255) NULL,
	[Publish_Date] [datetime] NULL,
	[End_Date] [datetime] NULL,
	[Status] [tinyint] NULL,
	[Created_At] [datetime] NULL,
	[Updated_At] [datetime] NULL,
	[Deleted_At] [datetime] NULL,
 CONSTRAINT [PK__News__3214EC07A828D6F9] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderItems]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItems](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[OrderUuid] [varchar](36) NOT NULL,
	[ProductUuid] [varchar](36) NOT NULL,
	[Quantity] [int] NULL,
	[Price] [decimal](18, 2) NULL,
	[TotalAmount] [decimal](18, 2) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[UserUuid] [varchar](36) NOT NULL,
	[OrderNumber] [varchar](50) NOT NULL,
	[Status] [tinyint] NULL,
	[TotalAmount] [decimal](18, 2) NULL,
	[PaymentMethod] [varchar](50) NULL,
	[ShippingAddress] [text] NULL,
	[ShippingMethod] [varchar](50) NULL,
	[ShippingDate] [date] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Code] [varchar](50) NOT NULL,
	[Description] [text] NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Images]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Images](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Product_Uuid] [varchar](36) NOT NULL,
	[Image_Url] [varchar](255) NOT NULL,
	[Is_Primary] [bit] NULL,
	[Sort_Order] [int] NULL,
	[Created_At] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductCategories]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCategories](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[ImageUrl] [varchar](255) NULL,
	[SortOrder] [int] NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[CategoryUuid] [varchar](36) NOT NULL,
	[SubcategoryUuid] [varchar](36) NOT NULL,
	[SubcategoryDetailUuid] [varchar](36) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[Price] [decimal](18, 2) NULL,
	[Stock] [int] NULL,
	[ImageUrl] [varchar](255) NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductSubcategories]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductSubcategories](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CategoryUuid] [varchar](36) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[ImageUrl] [varchar](255) NULL,
	[SortOrder] [int] NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductSubcategoriesDetail]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductSubcategoriesDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[SubcategoryUuid] [varchar](36) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [text] NULL,
	[ImageUrl] [varchar](255) NULL,
	[SortOrder] [int] NULL,
	[Status] [tinyint] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolePermissions]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolePermissions](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[RoleUuid] [varchar](36) NOT NULL,
	[PermissionUuid] [varchar](36) NOT NULL,
	[CreatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [text] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[PasswordHash] [varchar](255) NOT NULL,
	[RoleId] [bigint] NOT NULL,
	[Department] [varchar](50) NULL,
	[Position] [varchar](50) NULL,
	[Status] [tinyint] NULL,
	[LastLogin] [datetime] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserProfiles]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserProfiles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserUuid] [varchar](36) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[BirthDate] [date] NULL,
	[Gender] [char](1) NULL,
	[Address] [text] NULL,
	[AvatarUrl] [varchar](255) NULL,
	[PreferredLanguage] [varchar](10) NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[CustomerUuid] [varchar](36) NULL,
	[Username] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[PasswordHash] [varchar](255) NULL,
	[Phone] [varchar](20) NULL,
	[Status] [tinyint] NULL,
	[LastLogin] [datetime] NULL,
	[CreatedAt] [datetime] NULL,
	[UpdatedAt] [datetime] NULL,
	[DeletedAt] [datetime] NULL,
 CONSTRAINT [PK__Users__3214EC075ACFD0BB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WebLoginKey]    Script Date: 2024/12/4 上午 11:25:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WebLoginKey](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Uuid] [varchar](36) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[LoginKey] [varchar](20) NOT NULL,
	[Description] [text] NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK__WebLogin__3214EC07F899405D] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[HomeData] ON 

INSERT [dbo].[HomeData] ([Id], [Uuid], [CustomerUuid], [Title], [TitleImg], [IsDel], [Title_Status], [CreatedAt], [UpdatedAt]) VALUES (1, N'C30E487F-9FB1-4DF0-887F-CBA164DE2D91', N'example-customer-uuid', N'123', N'', 0, 1, CAST(N'2024-11-27T10:55:25.940' AS DateTime), CAST(N'2024-11-27T10:55:25.940' AS DateTime))
INSERT [dbo].[HomeData] ([Id], [Uuid], [CustomerUuid], [Title], [TitleImg], [IsDel], [Title_Status], [CreatedAt], [UpdatedAt]) VALUES (2, N'C54A826A-390F-40CB-83AD-59DDB5C951FE', N'example-customer-uuid', N'你好', N'', 0, 1, CAST(N'2024-11-27T10:58:32.353' AS DateTime), CAST(N'2024-11-28T11:18:44.623' AS DateTime))
INSERT [dbo].[HomeData] ([Id], [Uuid], [CustomerUuid], [Title], [TitleImg], [IsDel], [Title_Status], [CreatedAt], [UpdatedAt]) VALUES (3, N'E4EFECC0-53CF-49F2-872B-D0368964A9A0', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'哈囉XZV', N'', 0, 1, CAST(N'2024-11-28T11:19:03.040' AS DateTime), CAST(N'2024-11-28T14:12:11.007' AS DateTime))
INSERT [dbo].[HomeData] ([Id], [Uuid], [CustomerUuid], [Title], [TitleImg], [IsDel], [Title_Status], [CreatedAt], [UpdatedAt]) VALUES (4, N'E6D74AD0-945B-4826-98DD-58EE941B9C89', N'example-customer-uuid', N'你好123456', N'', 0, 1, CAST(N'2024-11-28T11:19:12.297' AS DateTime), CAST(N'2024-11-28T11:19:12.297' AS DateTime))
INSERT [dbo].[HomeData] ([Id], [Uuid], [CustomerUuid], [Title], [TitleImg], [IsDel], [Title_Status], [CreatedAt], [UpdatedAt]) VALUES (6, N'81D5F7D8-A610-4303-8982-2FE27D0C06B3', N'default-uuid', N'HomeTitle', N'market.jpg', 0, 1, CAST(N'2024-11-28T14:48:16.150' AS DateTime), CAST(N'2024-11-28T16:13:58.700' AS DateTime))
SET IDENTITY_INSERT [dbo].[HomeData] OFF
GO
SET IDENTITY_INSERT [dbo].[News] ON 

INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (3, N'550e8400-e29b-41d4-a716-446655440000', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'新聞標題一', N'新聞內容一123', NULL, CAST(N'2024-11-28T08:53:38.817' AS DateTime), NULL, 0, CAST(N'2024-11-28T16:53:38.817' AS DateTime), CAST(N'2024-11-28T18:57:30.143' AS DateTime), CAST(N'2024-11-28T19:37:09.130' AS DateTime))
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (4, N'660f8400-f29c-42d4-b826-556766550111', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'新聞標題二', N'新聞內容二', NULL, CAST(N'2024-11-28T16:53:38.817' AS DateTime), NULL, 1, CAST(N'2024-11-28T16:53:38.817' AS DateTime), CAST(N'2024-11-28T16:53:38.817' AS DateTime), NULL)
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (5, N'770W8551-f29c-42d4-b826-556766550111', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'新聞標題3', N'新聞內容3', NULL, CAST(N'2024-11-28T18:57:52.623' AS DateTime), NULL, 0, CAST(N'2024-11-28T18:57:52.623' AS DateTime), CAST(N'2024-11-28T18:57:52.623' AS DateTime), NULL)
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (6, N'6f7fa3f3-a60f-463f-9bd2-0893b264303e', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'測試新增', N'測試新增1111', NULL, CAST(N'2024-11-28T10:58:36.740' AS DateTime), NULL, 1, CAST(N'2024-11-28T18:58:36.743' AS DateTime), CAST(N'2024-11-28T18:58:36.743' AS DateTime), NULL)
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (8, N'a8f3793c-e037-4856-ade8-ae7d11ff42a7', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'vupptest', N'aaaaa', NULL, CAST(N'2024-11-28T19:06:21.810' AS DateTime), NULL, 0, CAST(N'2024-11-28T19:06:21.810' AS DateTime), CAST(N'2024-11-28T19:06:21.810' AS DateTime), NULL)
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (9, N'a882f87a-b39c-41d5-958c-f93bfd85e3c2', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'gggg', N'asdasdad', NULL, CAST(N'2024-11-28T19:07:58.243' AS DateTime), NULL, 0, CAST(N'2024-11-28T19:07:58.243' AS DateTime), CAST(N'2024-11-28T19:07:58.243' AS DateTime), CAST(N'2024-11-28T19:24:05.300' AS DateTime))
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (10, N'c1a9a26d-e2da-42ca-96bd-d5df359952e8', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'WWW', N'ASDASDZ', NULL, CAST(N'2024-11-28T19:12:37.943' AS DateTime), NULL, 0, CAST(N'2024-11-28T19:12:37.943' AS DateTime), CAST(N'2024-11-28T19:12:37.943' AS DateTime), CAST(N'2024-11-28T19:22:46.300' AS DateTime))
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (11, N'9935ac60-6ffa-4ebc-aa9e-f82361851597', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'MMM', N'KKK', NULL, CAST(N'2025-01-23T02:18:00.000' AS DateTime), NULL, 0, CAST(N'2024-11-28T19:15:45.867' AS DateTime), CAST(N'2024-11-28T19:15:45.867' AS DateTime), CAST(N'2024-11-28T19:36:52.820' AS DateTime))
INSERT [dbo].[News] ([Id], [Uuid], [Customer_Uuid], [Title], [Content], [Image_Url], [Publish_Date], [End_Date], [Status], [Created_At], [Updated_At], [Deleted_At]) VALUES (12, N'c41d3902-d87a-4972-be51-8694bef551a8', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'666', N'456', NULL, CAST(N'2024-11-28T11:58:11.773' AS DateTime), NULL, 1, CAST(N'2024-11-28T19:58:12.077' AS DateTime), CAST(N'2024-11-28T19:58:12.077' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[News] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Uuid], [CustomerUuid], [Username], [Email], [PasswordHash], [Phone], [Status], [LastLogin], [CreatedAt], [UpdatedAt], [DeletedAt]) VALUES (5, N'706526F4-82FA-4F1A-9B02-975A3BD2720C', N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'carl', N'11857@gmail.com', N'$2b$12$AjDR9RzJF0SdJs6FzlGz/..WM9WnCQg4pKsxNEd5vlHujFACEcmEm', N'', 1, CAST(N'2024-12-02T14:14:08.197' AS DateTime), CAST(N'2024-11-27T16:25:35.560' AS DateTime), CAST(N'2024-11-27T16:25:35.560' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[WebLoginKey] ON 

INSERT [dbo].[WebLoginKey] ([Id], [Uuid], [Name], [LoginKey], [Description], [CreatedAt]) VALUES (4, N'30AE0377-E72C-4D79-BD42-4B6ADA7E6E83', N'測試', N'IlQ4wHyle01g', N'描述描述', CAST(N'2024-11-27T14:15:09.903' AS DateTime))
SET IDENTITY_INSERT [dbo].[WebLoginKey] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__About_Us__BDA103F43C750C37]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[About_Us] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Customer__BDA103F42B5D00CA]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Customers] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__HomeData__BDA103F4A2F703BE]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[HomeData] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Media__BDA103F44C4176FA]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Media] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__News__BDA103F43296E87C]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[News] ADD  CONSTRAINT [UQ__News__BDA103F43296E87C] UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Orders__BDA103F4D7FFDF5D]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Orders] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Orders__CAC5E74379B5AB14]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Orders] ADD UNIQUE NONCLUSTERED 
(
	[OrderNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Permissi__BDA103F4CC49F7AF]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Permissions] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__ProductC__BDA103F4929C6A79]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[ProductCategories] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Products__BDA103F48ECB7A75]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Products] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__ProductS__BDA103F4F64A72C9]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[ProductSubcategories] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__ProductS__BDA103F45D4C6B65]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[ProductSubcategoriesDetail] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Roles__BDA103F4982DC01E]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Roles] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Staff__BDA103F475379726]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Staff] ADD UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__BDA103F43E67B215]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [UQ__Users__BDA103F43E67B215] UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__WebLogin__BDA103F46AF333A5]    Script Date: 2024/12/4 上午 11:25:42 ******/
ALTER TABLE [dbo].[WebLoginKey] ADD  CONSTRAINT [UQ__WebLogin__BDA103F46AF333A5] UNIQUE NONCLUSTERED 
(
	[Uuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[About_Us] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[About_Us] ADD  DEFAULT (getdate()) FOR [Created_Ut]
GO
ALTER TABLE [dbo].[About_Us] ADD  DEFAULT (getdate()) FOR [Updated_Ut]
GO
ALTER TABLE [dbo].[Customers] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Customers] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Customers] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[HomeData] ADD  DEFAULT ((0)) FOR [IsDel]
GO
ALTER TABLE [dbo].[HomeData] ADD  DEFAULT ((1)) FOR [Title_Status]
GO
ALTER TABLE [dbo].[HomeData] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[HomeData] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Languages] ADD  DEFAULT ((0)) FOR [IsDefault]
GO
ALTER TABLE [dbo].[Languages] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Languages] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Media] ADD  DEFAULT ((0)) FOR [SortOrder]
GO
ALTER TABLE [dbo].[Media] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Media] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Media] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[News] ADD  CONSTRAINT [DF__News__Status__0A9D95DB]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[News] ADD  CONSTRAINT [DF__News__Created_At__0B91BA14]  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[News] ADD  CONSTRAINT [DF__News__Updated_At__0C85DE4D]  DEFAULT (getdate()) FOR [Updated_At]
GO
ALTER TABLE [dbo].[OrderItems] ADD  DEFAULT ((1)) FOR [Quantity]
GO
ALTER TABLE [dbo].[OrderItems] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[OrderItems] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Permissions] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Product_Images] ADD  DEFAULT ((0)) FOR [Is_Primary]
GO
ALTER TABLE [dbo].[Product_Images] ADD  DEFAULT ((0)) FOR [Sort_Order]
GO
ALTER TABLE [dbo].[Product_Images] ADD  DEFAULT (getdate()) FOR [Created_At]
GO
ALTER TABLE [dbo].[ProductCategories] ADD  DEFAULT ((0)) FOR [SortOrder]
GO
ALTER TABLE [dbo].[ProductCategories] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[ProductCategories] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ProductCategories] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((0)) FOR [Stock]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[ProductSubcategories] ADD  DEFAULT ((0)) FOR [SortOrder]
GO
ALTER TABLE [dbo].[ProductSubcategories] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[ProductSubcategories] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ProductSubcategories] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[ProductSubcategoriesDetail] ADD  DEFAULT ((0)) FOR [SortOrder]
GO
ALTER TABLE [dbo].[ProductSubcategoriesDetail] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[ProductSubcategoriesDetail] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ProductSubcategoriesDetail] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[RolePermissions] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Roles] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Staff] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Staff] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Staff] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[UserProfiles] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[UserProfiles] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__Status__4316F928]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__CreatedAt__440B1D61]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF__Users__UpdatedAt__44FF419A]  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[WebLoginKey] ADD  CONSTRAINT [DF__WebLoginK__Creat__3493CFA7]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[About_Us]  WITH CHECK ADD FOREIGN KEY([Customer_Uuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[Media]  WITH CHECK ADD FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD FOREIGN KEY([OrderUuid])
REFERENCES [dbo].[Orders] ([Uuid])
GO
ALTER TABLE [dbo].[OrderItems]  WITH CHECK ADD FOREIGN KEY([ProductUuid])
REFERENCES [dbo].[Products] ([Uuid])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK__Orders__UserUuid__00200768] FOREIGN KEY([UserUuid])
REFERENCES [dbo].[Users] ([Uuid])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK__Orders__UserUuid__00200768]
GO
ALTER TABLE [dbo].[Product_Images]  WITH CHECK ADD FOREIGN KEY([Product_Uuid])
REFERENCES [dbo].[Products] ([Uuid])
GO
ALTER TABLE [dbo].[ProductCategories]  WITH CHECK ADD FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([CategoryUuid])
REFERENCES [dbo].[ProductCategories] ([Uuid])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([SubcategoryUuid])
REFERENCES [dbo].[ProductSubcategories] ([Uuid])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([SubcategoryDetailUuid])
REFERENCES [dbo].[ProductSubcategoriesDetail] ([Uuid])
GO
ALTER TABLE [dbo].[ProductSubcategories]  WITH CHECK ADD FOREIGN KEY([CategoryUuid])
REFERENCES [dbo].[ProductCategories] ([Uuid])
GO
ALTER TABLE [dbo].[ProductSubcategoriesDetail]  WITH CHECK ADD FOREIGN KEY([SubcategoryUuid])
REFERENCES [dbo].[ProductSubcategories] ([Uuid])
GO
ALTER TABLE [dbo].[RolePermissions]  WITH CHECK ADD FOREIGN KEY([PermissionUuid])
REFERENCES [dbo].[Permissions] ([Uuid])
GO
ALTER TABLE [dbo].[RolePermissions]  WITH CHECK ADD FOREIGN KEY([RoleUuid])
REFERENCES [dbo].[Roles] ([Uuid])
GO
ALTER TABLE [dbo].[Roles]  WITH CHECK ADD FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK__UserProfi__UserU__4AB81AF0] FOREIGN KEY([UserUuid])
REFERENCES [dbo].[Users] ([Uuid])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK__UserProfi__UserU__4AB81AF0]
GO
ALTER TABLE [dbo].[Users]  WITH NOCHECK ADD  CONSTRAINT [FK__Users__CustomerU__45F365D3] FOREIGN KEY([CustomerUuid])
REFERENCES [dbo].[Customers] ([Uuid])
GO
ALTER TABLE [dbo].[Users] NOCHECK CONSTRAINT [FK__Users__CustomerU__45F365D3]
GO
