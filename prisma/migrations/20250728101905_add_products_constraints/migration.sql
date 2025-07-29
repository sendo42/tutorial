ALTER TABLE "products" ADD CONSTRAINT "products_title_length_check" CHECK (length("title") >= 1);
ALTER TABLE "products" ADD CONSTRAINT "products_description_length_check" CHECK (length("description") >= 1);
ALTER TABLE "products" ADD CONSTRAINT "products_price_length_check" CHECK ("price" >= 1);
ALTER TABLE "products" ADD CONSTRAINT "products_stock_length_check" CHECK ("stock" >= 1);