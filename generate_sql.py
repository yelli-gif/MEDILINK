import csv
import io

# We will read the file and generate SQL
input_file = r'c:\Users\desai\OneDrive\Desktop\Medilink-Project-test-supabase\Base_Donnees_200_Medicaments.csv.xls'
output_file = r'c:\Users\desai\OneDrive\Desktop\Medilink-Project-test-supabase\medicaments_seed.sql'

sql_content = """
CREATE TABLE IF NOT EXISTS medicament (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    nom VARCHAR(255) NOT NULL,
    forme VARCHAR(255),
    prix DOUBLE PRECISION
);

-- Vider la table si elle existe deja (optionnel)
TRUNCATE TABLE medicament RESTART IDENTITY CASCADE;

"""

with open(input_file, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if i == 0 or not line.strip():
        continue
    
    parts = line.strip().split(';')
    if len(parts) >= 4:
        code = parts[0].strip().replace("'", "''")
        nom = parts[1].strip().replace("'", "''")
        forme = parts[2].strip().replace("'", "''")
        
        # Parse price
        prix_str = parts[3].strip().replace(' ', '').replace(',', '.')
        try:
            prix = float(prix_str)
        except ValueError:
            prix = 0.0
            
        sql_content += f"INSERT INTO medicament (code, nom, forme, prix) VALUES ('{code}', '{nom}', '{forme}', {prix});\n"

with open(output_file, 'w', encoding='utf-8') as out:
    out.write(sql_content)

print(f"Fichier {output_file} genéré avec succes avec {len(lines)-1} medicaments.")
