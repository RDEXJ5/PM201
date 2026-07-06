import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# En Docker se usa el host del servicio MySQL: db.
# En local puedes dejar tu conexión normal o definir DATABASE_URL.
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://api_user:1234@127.0.0.1:3306/coffee_manager",
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
