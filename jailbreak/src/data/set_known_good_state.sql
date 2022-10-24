CREATE PROCEDURE `set_known_good_state` ()
BEGIN
	delete from inventory_slot;
    alter table inventory_slot auto_increment = 1;
    delete from resources;
    alter table resources auto_increment = 1;
	delete from game;
    alter table game auto_increment = 1;
	delete from `user`;
    alter table `user` auto_increment = 1;
    delete from `role`;
    alter table `role` auto_increment = 1;
    
    insert into `role`(role_name) values
    ('ADMIN'),
    ('USER');
    
    insert into `user`(username, user_password, role_id) values
    ('admin', 'admin', 1),
    ('user', 'user', 2);
    
    insert into game (user_id, character_name, game_number) values
    (1, 'admin test', 1),
    (2, 'user test', 1);
    
    insert into resources (resource_name, resource_value, resource_default_inc_rate) values
    ('cheese', 1, 1),
    ('yogies', 2, 1);
    
    insert into inventory_slot(game_id, resource_id, quantity) values
    (1, 1, 2),
    (2, 2, 1);
    
END
