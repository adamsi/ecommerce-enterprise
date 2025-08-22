DROP SCHEMA IF EXISTS ${JTV_ENVIRONMENT} CASCADE;
CREATE SCHEMA ${JTV_ENVIRONMENT};


CREATE TABLE ${JTV_ENVIRONMENT}.users
(
    id             VARCHAR(3999) PRIMARY KEY,
    email          VARCHAR(255),
    password       VARCHAR(255),
    name           VARCHAR(255),
    oauth_provider VARCHAR(50),
    oauth_id       VARCHAR(255),
    role           VARCHAR(50),
    picture        TEXT
);


CREATE TABLE ${JTV_ENVIRONMENT}.categories
(
    id    VARCHAR(3999) PRIMARY KEY,
    name  VARCHAR(255),
    image TEXT
);


CREATE TABLE ${JTV_ENVIRONMENT}.products
(
    id             VARCHAR(3999) PRIMARY KEY,
    title          VARCHAR(50),
    slug           VARCHAR(255),
    price          NUMERIC(10, 2),
    image          TEXT,
    thumbnails     TEXT,
    materials      TEXT,
    sizes          TEXT,
    description    TEXT,
    stock_quantity INT,
    created_at     TIMESTAMP,
    category_id    VARCHAR(3999),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES ${JTV_ENVIRONMENT}.categories (id)
);

CREATE TABLE ${JTV_ENVIRONMENT}.customer_details
(
    id             VARCHAR(3999) PRIMARY KEY,
    address        VARCHAR(255),
    city           VARCHAR(100),
    state          VARCHAR(100),
    postal_code    VARCHAR(20),
    customer_name  VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20)
);


CREATE TABLE ${JTV_ENVIRONMENT}.orders
(
    id              VARCHAR(3999) PRIMARY KEY,
    transaction_id  VARCHAR(3999),
    total_amount    NUMERIC(10, 2),
    delivery_status VARCHAR(20),
    created_at      TIMESTAMP,
    customer_id     VARCHAR(3999),
    user_id         VARCHAR(3999),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${JTV_ENVIRONMENT}.users (id),
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES ${JTV_ENVIRONMENT}.customer_details (id)
);


CREATE TABLE ${JTV_ENVIRONMENT}.order_items
(
    id                VARCHAR(3999) PRIMARY KEY,
    order_id          VARCHAR(3999),
    product_id        VARCHAR(3999),
    quantity          VARCHAR(3999),
    price_at_purchase NUMERIC(10, 2),
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES ${JTV_ENVIRONMENT}.orders (id),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES ${JTV_ENVIRONMENT}.products (id)
);

CREATE TABLE ${JTV_ENVIRONMENT}.client_config
(
 id VARCHAR(3999) PRIMARY KEY,
 key VARCHAR(50),
 contents TEXT,
 images TEXT,
 CONSTRAINT unique_key UNIQUE(key)
);