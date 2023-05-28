truncate table empresa cascade;

INSERT INTO empresa (nombre,rut) VALUES
	 ('Cencosud','C001'),
	 ('Chilean Trading','96785290');


INSERT INTO unidad_negocio (nombre,"empresaId") VALUES
	 ('Jumbo',1),
	 ('Sisa',1),
	 ('Huechuraba',2);
