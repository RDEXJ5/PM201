import hashlib

texto = "76c46b2c87facd1f698dcd6dad01de100d434bf306ca2fd6809942f231f7d67d"
hash_generado = hashlib.sha256(texto.encode()).hexdigest()

print(hash_generado)