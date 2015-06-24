CREATE TABLE [dbo].[Products] (
    [ProductID]   INT             IDENTITY (1, 1) NOT NULL,
    [Name]        NCHAR (100)     NOT NULL,
    [Description] NCHAR (500)     NOT NULL,
    [Category]    NCHAR (50)      NOT NULL,
    [Price]       DECIMAL (16, 2) NULL,
    PRIMARY KEY CLUSTERED ([ProductID] ASC)
);



CREATE TABLE [dbo].[Orders] (
    [OrderId]    INT            IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (MAX) NULL,
    [Line1]      NVARCHAR (MAX) NULL,
    [Line2]      NVARCHAR (MAX) NULL,
    [Line3]      NVARCHAR (MAX) NULL,
    [City]       NVARCHAR (MAX) NULL,
    [State]      NVARCHAR (MAX) NULL,
    [GiftWrap]   BIT            NOT NULL,
    [Dispatched] BIT            NOT NULL,
    CONSTRAINT [PK_dbo.Orders] PRIMARY KEY CLUSTERED ([OrderId] ASC)
);

CREATE TABLE [dbo].[OrderLines]
(
	[OrderLineId] INT IDENTITY(1,1) NOT NULL, 
    [Quantity] INT NOT NULL DEFAULT 1, 
    [Product_ProductID] INT NULL, 
    [Order_OrderId] INT NULL, 
    CONSTRAINT [PK_dbo.OrderLines] PRIMARY KEY CLUSTERED ([OrderLineId] asc), 
    CONSTRAINT [FK_dbo.OrderLines_dbo.Products_Product_ProductID] FOREIGN KEY ([Product_ProductID]) REFERENCES [dbo].[Products](ProductID), 
    CONSTRAINT [FK_dbo.OrderLines_dbo.Orders_Order_OrderId] FOREIGN KEY ([Order_OrderId]) REFERENCES [dbo].[Orders](OrderId)
);