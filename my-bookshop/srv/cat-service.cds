using { Country, managed } from '@sap/cds/common';

service CatalogService {
   entity Books {
    key id    : Integer;
    title     : localized String;
    author    : Association to Authors;
    stock     : Integer;
}

    entity Authors {
        key id    : Integer;
        name      : String;
        books     : Association to many Books on books.author = $self;
    }

    entity orders {
        key id    : UUID;
        book      : Association to Books;
        country   : Country;
        amount    : Integer;
    }
    

}


