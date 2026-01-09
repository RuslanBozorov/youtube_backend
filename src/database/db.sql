create table users(
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    avatar text not null
);

create table files(
    id serial primary key,
    title varchar(255) not null,
    file_name varchar(255) not null,
    size integer not null,
    user_id int references users(id)on  delete cascade,
    created_at timestamp default(current_timestamp)
)