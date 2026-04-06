using my.bookshop as my from './schema';

service CatalogService {
    entity Books as projection on my.Books ;
    
    entity Authors as projection on my.Authors ;
    
    entity Orders as projection on my.Orders;
}