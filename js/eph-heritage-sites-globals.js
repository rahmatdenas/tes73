'use strict';

const BASE_TITLE = 'Tan Malaka';
const SPARQL_RESIDENCE_QUERY = `
SELECT ?location ?locationLabel ?pointInTime ?ptPrecision (SAMPLE(?coord_raw) AS ?coord) (SAMPLE(?image_raw) AS ?image) WHERE {
  # Fokus pada butir tokoh Q561682 (misal: Tan Malaka)
  wd:Q561682 p:P551 ?residenceStatement .
  ?residenceStatement ps:P551 ?location .
  
  # WAJIB memiliki atribut "pada waktu" (P585)
  ?residenceStatement pqv:P585 ?ptNode .
  ?ptNode wikibase:timeValue ?pointInTime ;
          wikibase:timePrecision ?ptPrecision .
          
  # Ambil koordinat lokasi (opsional)
  OPTIONAL { ?location wdt:P625 ?coord_raw . }
  
  # Ambil gambar lokasi (opsional)
  OPTIONAL { ?location wdt:P18 ?image_raw . }
  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "id,en". }
}
GROUP BY ?location ?locationLabel ?pointInTime ?ptPrecision
ORDER BY ?pointInTime # Diurutkan mentah dari SPARQL, tapi kita pastikan lagi di JS
`;
