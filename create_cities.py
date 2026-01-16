import json
import os

cities = [
    {
        "name": "Bad Segeberg",
        "slug": "fahrzeugaufbereitung-bad-segeberg",
        "distance": "15 min",
        "metaDescription": "Ihr Experte für Detailing und Keramikversiegelung nahe Bad Segeberg. Kalkberg-Staub und Alltagsschmutz haben keine Chance. Werterhalt vom zertifizierten Profi.",
        "geo": {"latitude": 53.9369, "longitude": 10.3096},
        "zip": "23795",
        "introText": "Viele Bad Segeberger kennen das Problem: Der Kalkberg staubt, die B432 sorgt für Insektenbeschlag. RG Detailing in Tensfeld ist nur einen Katzensprung entfernt und bietet die Lösung, die Waschanlagen nicht leisten können."
    },
    {
        "name": "Neumünster",
        "slug": "fahrzeugaufbereitung-neumuenster",
        "distance": "20 min",
        "metaDescription": "Premium Autoaufbereitung für Neumünster. Schluss mit Waschkratzern. Wir bieten Hochglanzpolitur und Keramikschutz unweit der A7.",
        "geo": {"latitude": 54.0713, "longitude": 9.9906},
        "zip": "24534",
        "introText": "Neumünster ist ein Verkehrsknotenpunkt. Ob Pendler auf der A7 oder Stadtverkehr am Designer Outlet – Ihr Fahrzeug leidet. Eine professionelle Aufbereitung in Tensfeld (nur 20 Min) bringt den Neuwagen-Glanz zurück."
    },
    {
        "name": "Kiel",
        "slug": "fahrzeugaufbereitung-kiel",
        "distance": "35 min",
        "metaDescription": "Exklusive Fahrzeugaufbereitung für Kiel. Schutz vor salziger Seeluft und Möwenkot. Keramikversiegelung vom Labocosmetica-Partner.",
        "geo": {"latitude": 54.3233, "longitude": 10.1227},
        "zip": "24103",
        "introText": "Kieler Autos haben einen natürlichen Feind: Die salzhaltige Luft der Förde. Salz fördert Korrosion und lässt Lacke schneller altern. Unsere Keramikversiegelungen bieten den ultimativen Schutzschild für Ihren Wagen an der Küste."
    },
    {
        "name": "Lübeck",
        "slug": "fahrzeugaufbereitung-luebeck",
        "distance": "35 min",
        "metaDescription": "Detailing für die Hansestadt Lübeck. Bewahren Sie den Wert Ihres Fahrzeugs mit High-End Pflege. Ideal für Leasingrückläufer und Liebhaberfahrzeuge.",
        "geo": {"latitude": 53.8655, "longitude": 10.6866},
        "zip": "23552",
        "introText": "In der engen Lübecker Altstadt sind kleine Kratzer fast unvermeidbar. Doch statt teurer Lackierung hilft oft unsere mehrstufige Lackkorrektur. Die Fahrt nach Tensfeld lohnt sich für ein Ergebnis, das selbst Hanseaten überzeugt."
    },
    {
        "name": "Plön",
        "slug": "fahrzeugaufbereitung-ploen",
        "distance": "25 min",
        "metaDescription": "Autopflege für Plön und die Holsteinische Schweiz. Gönnen Sie Ihrem Cabrio oder SUV eine Wellness-Kur. Dampfreinigung & Politur.",
        "geo": {"latitude": 54.1578, "longitude": 10.4250},
        "zip": "24306",
        "introText": "Die Fahrt durch die Holsteinische Schweiz ist ein Genuss – bis auf den Blütenstaub und Harz der Wälder rund um Plön. Wir entfernen diese aggressiven Rückstände schonend und versiegeln den Lack dauerhaft."
    },
    {
        "name": "Eutin",
        "slug": "fahrzeugaufbereitung-eutin",
        "distance": "30 min",
        "metaDescription": "Ihr Partner für Fahrzeugaufbereitung in Eutin. Rosenstadt-Glanz für Ihr Auto. Wir entfernen Kratzer und versiegeln dauerhaft.",
        "geo": {"latitude": 54.1365, "longitude": 10.6139},
        "zip": "23701",
        "introText": "Eutin, die Rosenstadt, steht für Ästhetik. Ihr Auto sollte da mithalten. Ob nach einem Ausflug an die Ostsee oder dem täglichen Pendeln – wir sorgen dafür, dass Ihr Fahrzeug so strahlt wie das Eutiner Schloss."
    },
    {
        "name": "Norderstedt",
        "slug": "fahrzeugaufbereitung-norderstedt",
        "distance": "45 min",
        "metaDescription": "High-End Detailing für Norderstedt. Der Weg aus dem Speckgürtel lohnt sich: Echte Handarbeit statt Fließband-Wäsche. Wertgutachten-Optimierung.",
        "geo": {"latitude": 53.7056, "longitude": 10.0058},
        "zip": "22846",
        "introText": "In Norderstedt ist das Angebot riesig, aber echte Manufaktur-Qualität ist selten. Viele unserer Kunden nehmen die Fahrt aus dem Hamburger Speckgürtel gerne in Kauf, weil wir uns Zeit nehmen, die andere nicht haben."
    },
    {
        "name": "Ahrensburg",
        "slug": "fahrzeugaufbereitung-ahrensburg",
        "distance": "40 min",
        "metaDescription": "Premium Autopflege für Ahrensburg. Exklusive Keramikversiegelung für hochwertige Fahrzeuge. Werterhalt für Ihren Porsche, BMW oder Mercedes.",
        "geo": {"latitude": 53.6744, "longitude": 10.2375},
        "zip": "22926",
        "introText": "Ahrensburg ist bekannt für schöne Villen und schöne Autos. Damit der Lack Ihres Premium-Fahrzeugs auch Premium bleibt, bieten wir High-End-Detailing. Diskret, professionell und mit höchstem Anspruch."
    },
    {
        "name": "Rendsburg",
        "slug": "fahrzeugaufbereitung-rendsburg",
        "distance": "45 min",
        "metaDescription": "Fahrzeugaufbereitung Rendsburg. Beseitigung von Waschanlagen-Spuren und Innenraum-Reinigung mit Dampf. Hygiene und Glanz.",
        "geo": {"latitude": 54.3056, "longitude": 9.6644},
        "zip": "24768",
        "introText": "Vom Nord-Ostsee-Kanal direkt zu uns. Rendsburger Kunden schätzen unsere ehrliche, norddeutsche Art. Wir schnacken nicht lange, wir liefern Ergebnisse – besonders bei hartnäckigen Verschmutzungen."
    },
    {
        "name": "Kaltenkirchen",
        "slug": "fahrzeugaufbereitung-kaltenkirchen",
        "distance": "30 min",
        "metaDescription": "Autoaufbereitung Kaltenkirchen. Leasing-Rückgabe steht an? Wir bereiten Ihr Auto so auf, dass der Gutachter nichts zu meckern hat.",
        "geo": {"latitude": 53.8383, "longitude": 9.9633},
        "zip": "24568",
        "introText": "Kaltenkirchen wächst – und mit ihm der Verkehr. Steinschläge und Kratzer bleiben nicht aus. Wir sind Ihr Partner für Smart-Repair Vorbereitung und intensive Lackpflege, nur eine halbe Stunde entfernt."
    }
]

output_dir = "src/content/cities"
os.makedirs(output_dir, exist_ok=True)

for city in cities:
    filename = city['slug'].replace("fahrzeugaufbereitung-", "") + ".json"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(city, f, ensure_ascii=False, indent=2)
    print(f"Created {filepath}")
