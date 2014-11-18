steal(function() {

var timezones = [
    {"Pacific/Midway": "(UTC -11:00) Midway, Niue, Pago Pago"},
    {"America/Adak": "(UTC -10:00) Adak"},
    {"Pacific/Fakaofo": "(UTC -10:00) Fakaofo, Honolulu, Johnston, Rarotonga, Tahiti"},
    {"Pacific/Marquesas": "(UTC -10:30) Marquesas"},
    {"America/Anchorage": "(UTC -09:00) Anchorage, Juneau, Nome, Sitka, Yakutat"},
    {"Pacific/Gambier": "(UTC -09:00) Gambier"},
    {"America/Dawson": "(UTC -08:00) Dawson, Los Angeles, Tijuana, Vancouver, Whitehorse"},
    {"America/Santa_Isabel": "(UTC -08:00) Santa Isabel"},
    {"America/Metlakatla": "(UTC -08:00) Metlakatla, Pitcairn"},
    {"America/Dawson_Creek": "(UTC -07:00) Dawson Creek, Hermosillo, Phoenix"},
    {"America/Chihuahua": "(UTC -07:00) Chihuahua, Mazatlan"},
    {"America/Boise": "(UTC -07:00) Boise, Cambridge Bay, Denver, Edmonton, Inuvik, Ojinaga, Shiprock, Yellowknife"},
    {"America/Chicago": "(UTC -06:00) Beulah, Center, Chicago, Knox, Matamoros, Menominee, New Salem, Rainy River, Rankin Inlet, Resolute, Tell City, Winnipeg"},
    {"America/Belize": "(UTC -06:00) Belize, Costa Rica, El Salvador, Galapagos, Guatemala, Managua, Regina, Swift Current, Tegucigalpa"},
    {"Pacific/Easter": "(UTC -06:00) Easter"},
    {"America/Bahia_Banderas": "(UTC -06:00) Bahia Banderas, Cancun, Merida, Mexico City, Monterrey"},
    {"America/Detroit": "(UTC -05:00) Detroit, Grand Turk, Indianapolis, Iqaluit, Louisville, Marengo, Monticello, Montreal, Nassau, New York, Nipigon, Pangnirtung, Petersburg, Thunder Bay, Toronto, Vevay, Vincennes, Winamac"},
    {"America/Atikokan": "(UTC -05:00) Atikokan, Bogota, Cayman, Guayaquil, Jamaica, Lima, Panama, Port-au-Prince"},
    {"America/Havana": "(UTC -05:00) Havana"},
    {"America/Caracas": "(UTC -05:30) Caracas"},
    {"America/Glace_Bay": "(UTC -04:00) Bermuda, Glace Bay, Goose Bay, Halifax, Moncton, Thule"},
    {"Atlantic/Stanley": "(UTC -04:00) Stanley"},
    {"America/Santiago": "(UTC -04:00) Palmer, Santiago"},
    {"America/Anguilla": "(UTC -04:00) Anguilla, Antigua, Aruba, Barbados, Blanc-Sablon, Boa Vista, Curacao, Dominica, Eirunepe, Grenada, Guadeloupe, Guyana, Kralendijk, La Paz, Lower Princes, Manaus, Marigot, Martinique, Montserrat, Port of Spain, Porto Velho, Puerto Rico, Rio Branco, Santo Domingo, St Barthelemy, St Kitts, St Lucia, St Thomas, St Vincent, Tortola"},
    {"America/Campo_Grande": "(UTC -04:00) Campo Grande, Cuiaba"},
    {"America/Asuncion": "(UTC -04:00) Asuncion"},
    {"America/St_Johns": "(UTC -04:30) St Johns"},
    {"America/Sao_Paulo": "(UTC -03:00) Sao Paulo"},
    {"America/Araguaina": "(UTC -03:00) Araguaina, Bahia, Belem, Buenos Aires, Catamarca, Cayenne, Cordoba, Fortaleza, Jujuy, La Rioja, Maceio, Mendoza, Paramaribo, Recife, Rio Gallegos, Rothera, Salta, San Juan, Santarem, Tucuman, Ushuaia"},
    {"America/Montevideo": "(UTC -03:00) Montevideo"},
    {"America/Godthab": "(UTC -03:00) Godthab"},
    {"America/Argentina/San_Luis": "(UTC -03:00) San Luis"},
    {"America/Miquelon": "(UTC -03:00) Miquelon"},
    {"America/Noronha": "(UTC -02:00) Noronha, South Georgia"},
    {"Atlantic/Cape_Verde": "(UTC -01:00) Cape Verde"},
    {"America/Scoresbysund": "(UTC -01:00) Azores, Scoresbysund"},
    {"Atlantic/Canary": "(UTC) Canary, Dublin, Faroe, Guernsey, Isle of Man, Jersey, Lisbon, London, Madeira"},
    {"Africa/Abidjan": "(UTC) Abidjan, Accra, Bamako, Banjul, Bissau, Casablanca, Conakry, Dakar, Danmarkshavn, El Aaiun, Freetown, Lome, Monrovia, Nouakchott, Ouagadougou, Reykjavik, Sao Tome, St Helena"},
    {"Africa/Algiers": "(UTC +01:00) Algiers, Bangui, Brazzaville, Douala, Kinshasa, Lagos, Libreville, Luanda, Malabo, Ndjamena, Niamey, Porto-Novo, Tunis"},
    {"Africa/Ceuta": "(UTC +01:00) Amsterdam, Andorra, Belgrade, Berlin, Bratislava, Brussels, Budapest, Ceuta, Copenhagen, Gibraltar, Ljubljana, Longyearbyen, Luxembourg, Madrid, Malta, Monaco, Oslo, Paris, Podgorica, Prague, Rome, San Marino, Sarajevo, Skopje, Stockholm, Tirane, Vaduz, Vatican, Vienna, Warsaw, Zagreb, Zurich"},
    {"Africa/Windhoek": "(UTC +01:00) Windhoek"},
    {"Asia/Damascus": "(UTC +02:00) Damascus"},
    {"Asia/Beirut": "(UTC +02:00) Beirut"},
    {"Asia/Jerusalem": "(UTC +02:00) Jerusalem"},
    {"Asia/Nicosia": "(UTC +02:00) Athens, Bucharest, Chisinau, Helsinki, Istanbul, Mariehamn, Nicosia, Riga, Sofia, Tallinn, Vilnius"},
    {"Africa/Blantyre": "(UTC +02:00) Blantyre, Bujumbura, Cairo, Gaborone, Gaza, Harare, Hebron, Johannesburg, Kigali, Lubumbashi, Lusaka, Maputo, Maseru, Mbabane, Tripoli"},
    {"Asia/Amman": "(UTC +02:00) Amman"},
    {"Africa/Addis_Ababa": "(UTC +03:00) Addis Ababa, Aden, Antananarivo, Asmara, Baghdad, Bahrain, Comoro, Dar es Salaam, Djibouti, Juba, Kaliningrad, Kampala, Khartoum, Kiev, Kuwait, Mayotte, Minsk, Mogadishu, Nairobi, Qatar, Riyadh, Simferopol, Syowa, Uzhgorod, Zaporozhye"},
    {"Asia/Tehran": "(UTC +03:30) Tehran"},
    {"Asia/Yerevan": "(UTC +04:00) Yerevan"},
    {"Asia/Dubai": "(UTC +04:00) Dubai, Mahe, Mauritius, Moscow, Muscat, Reunion, Samara, Tbilisi, Volgograd"},
    {"Asia/Baku": "(UTC +04:00) Baku"},
    {"Asia/Kabul": "(UTC +04:30) Kabul"},
    {"Antarctica/Mawson": "(UTC +05:00) Aqtau, Aqtobe, Ashgabat, Dushanbe, Karachi, Kerguelen, Maldives, Mawson, Oral, Samarkand, Tashkent"},
    {"Asia/Colombo": "(UTC +05:30) Colombo, Kolkata"},
    {"Asia/Kathmandu": "(UTC +05:45) Kathmandu"},
    {"Antarctica/Vostok": "(UTC +06:00) Almaty, Bishkek, Chagos, Dhaka, Qyzylorda, Thimphu, Vostok, Yekaterinburg"},
    {"Asia/Rangoon": "(UTC +06:30) Cocos, Rangoon"},
    {"Antarctica/Davis": "(UTC +07:00) Bangkok, Christmas, Davis, Ho Chi Minh, Hovd, Jakarta, Novokuznetsk, Novosibirsk, Omsk, Phnom Penh, Pontianak, Vientiane"},
    {"Antarctica/Casey": "(UTC +08:00) Brunei, Casey, Choibalsan, Chongqing, Harbin, Hong Kong, Kashgar, Krasnoyarsk, Kuala Lumpur, Kuching, Macau, Makassar, Manila, Perth, Shanghai, Singapore, Taipei, Ulaanbaatar, Urumqi"},
    {"Australia/Eucla": "(UTC +08:45) Eucla"},
    {"Asia/Dili": "(UTC +09:00) Dili, Irkutsk, Jayapura, Palau, Pyongyang, Seoul, Tokyo"},
    {"Australia/Adelaide": "(UTC +09:30) Adelaide, Broken Hill"},
    {"Australia/Darwin": "(UTC +09:30) Darwin"},
    {"Antarctica/DumontDUrville": "(UTC +10:00) Brisbane, Chuuk, DumontDUrville, Guam, Lindeman, Port Moresby, Saipan, Yakutsk"},
    {"Australia/Currie": "(UTC +10:00) Currie, Hobart, Melbourne, Sydney"},
    {"Australia/Lord_Howe": "(UTC +10:30) Lord Howe"},
    {"Antarctica/Macquarie": "(UTC +11:00) Efate, Guadalcanal, Kosrae, Macquarie, Noumea, Pohnpei, Sakhalin, Vladivostok"},
    {"Pacific/Norfolk": "(UTC +11:30) Norfolk"},
    {"Antarctica/McMurdo": "(UTC +12:00) Auckland, McMurdo, South Pole"},
    {"Asia/Anadyr": "(UTC +12:00) Anadyr, Fiji, Funafuti, Kamchatka, Kwajalein, Magadan, Majuro, Nauru, Tarawa, Wake, Wallis"},
    {"Pacific/Chatham": "(UTC +12:45) Chatham"},
    {"Pacific/Enderbury": "(UTC +13:00) Enderbury, Tongatapu"},
    {"Pacific/Apia": "(UTC +13:00) Apia"},
    {"Pacific/Kiritimati": "(UTC +14:00) Kiritimati"}
];

var countries = [
    {"AF": "Afghanistan"},
    {"AX": "Aland Islands"},
    {"AL": "Albania"},
    {"DZ": "Algeria"},
    {"AS": "American Samoa"},
    {"AD": "Andorra"},
    {"AO": "Angola"},
    {"AI": "Anguilla"},
    {"AQ": "Antarctica"},
    {"AG": "Antigua and Barbuda"},
    {"AR": "Argentina"},
    {"AM": "Armenia"},
    {"AW": "Aruba"},
    {"AU": "Australia"},
    {"AT": "Austria"},
    {"AZ": "Azerbaijan"},
    {"BS": "Bahamas"},
    {"BH": "Bahrain"},
    {"BD": "Bangladesh"},
    {"BB": "Barbados"},
    {"BY": "Belarus"},
    {"BE": "Belgium"},
    {"BZ": "Belize"},
    {"BJ": "Benin"},
    {"BM": "Bermuda"},
    {"BT": "Bhutan"},
    {"BO": "Bolivia, Plurinational State of"},
    {"BQ": "Bonaire, Sint Eustatius and Saba"},
    {"BA": "Bosnia and Herzegovina"},
    {"BW": "Botswana"},
    {"BV": "Bouvet Island"},
    {"BR": "Brazil"},
    {"IO": "British Indian Ocean Territory"},
    {"BN": "Brunei Darussalam"},
    {"BG": "Bulgaria"},
    {"BF": "Burkina Faso"},
    {"BI": "Burundi"},
    {"KH": "Cambodia"},
    {"CM": "Cameroon"},
    {"CA": "Canada"},
    {"CV": "Cape Verde"},
    {"KY": "Cayman Islands"},
    {"CF": "Central African Republic"},
    {"TD": "Chad"},
    {"CL": "Chile"},
    {"CN": "China"},
    {"CX": "Christmas Island"},
    {"CC": "Cocos (Keeling) Islands"},
    {"CO": "Colombia"},
    {"KM": "Comoros"},
    {"CG": "Congo"},
    {"CD": "Congo, the Democratic Republic of the"},
    {"CK": "Cook Islands"},
    {"CR": "Costa Rica"},
    {"CI": "Côte d'Ivoire"},
    {"HR": "Croatia"},
    {"CU": "Cuba"},
    {"CW": "Curaçao"},
    {"CY": "Cyprus"},
    {"CZ": "Czech Republic"},
    {"DK": "Denmark"},
    {"DJ": "Djibouti"},
    {"DM": "Dominica"},
    {"DO": "Dominican Republic"},
    {"EC": "Ecuador"},
    {"EG": "Egypt"},
    {"SV": "El Salvador"},
    {"GQ": "Equatorial Guinea"},
    {"ER": "Eritrea"},
    {"EE": "Estonia"},
    {"ET": "Ethiopia"},
    {"FK": "Falkland Islands (Malvinas)"},
    {"FO": "Faroe Islands"},
    {"FJ": "Fiji"},
    {"FI": "Finland"},
    {"FR": "France"},
    {"GF": "French Guiana"},
    {"PF": "French Polynesia"},
    {"TF": "French Southern Territories"},
    {"GA": "Gabon"},
    {"GM": "Gambia"},
    {"GE": "Georgia"},
    {"DE": "Germany"},
    {"GH": "Ghana"},
    {"GI": "Gibraltar"},
    {"GR": "Greece"},
    {"GL": "Greenland"},
    {"GD": "Grenada"},
    {"GP": "Guadeloupe"},
    {"GU": "Guam"},
    {"GT": "Guatemala"},
    {"GG": "Guernsey"},
    {"GN": "Guinea"},
    {"GW": "Guinea-Bissau"},
    {"GY": "Guyana"},
    {"HT": "Haiti"},
    {"HM": "Heard Island and McDonald Islands"},
    {"VA": "Holy See (Vatican City State)"},
    {"HN": "Honduras"},
    {"HK": "Hong Kong"},
    {"HU": "Hungary"},
    {"IS": "Iceland"},
    {"IN": "India"},
    {"ID": "Indonesia"},
    {"IR": "Iran, Islamic Republic of"},
    {"IQ": "Iraq"},
    {"IE": "Ireland"},
    {"IM": "Isle of Man"},
    {"IL": "Israel"},
    {"IT": "Italy"},
    {"JM": "Jamaica"},
    {"JP": "Japan"},
    {"JE": "Jersey"},
    {"JO": "Jordan"},
    {"KZ": "Kazakhstan"},
    {"KE": "Kenya"},
    {"KI": "Kiribati"},
    {"KP": "Korea, Democratic People's Republic of"},
    {"KR": "Korea, Republic of"},
    {"KW": "Kuwait"},
    {"KG": "Kyrgyzstan"},
    {"LA": "Lao People's Democratic Republic"},
    {"LV": "Latvia"},
    {"LB": "Lebanon"},
    {"LS": "Lesotho"},
    {"LR": "Liberia"},
    {"LY": "Libya"},
    {"LI": "Liechtenstein"},
    {"LT": "Lithuania"},
    {"LU": "Luxembourg"},
    {"MO": "Macao"},
    {"MK": "Macedonia, the former Yugoslav Republic of"},
    {"MG": "Madagascar"},
    {"MW": "Malawi"},
    {"MY": "Malaysia"},
    {"MV": "Maldives"},
    {"ML": "Mali"},
    {"MT": "Malta"},
    {"MH": "Marshall Islands"},
    {"MQ": "Martinique"},
    {"MR": "Mauritania"},
    {"MU": "Mauritius"},
    {"YT": "Mayotte"},
    {"MX": "Mexico"},
    {"FM": "Micronesia, Federated States of"},
    {"MD": "Moldova, Republic of"},
    {"MC": "Monaco"},
    {"MN": "Mongolia"},
    {"ME": "Montenegro"},
    {"MS": "Montserrat"},
    {"MA": "Morocco"},
    {"MZ": "Mozambique"},
    {"MM": "Myanmar"},
    {"NA": "Namibia"},
    {"NR": "Nauru"},
    {"NP": "Nepal"},
    {"NL": "Netherlands"},
    {"NC": "New Caledonia"},
    {"NZ": "New Zealand"},
    {"NI": "Nicaragua"},
    {"NE": "Niger"},
    {"NG": "Nigeria"},
    {"NU": "Niue"},
    {"NF": "Norfolk Island"},
    {"MP": "Northern Mariana Islands"},
    {"NO": "Norway"},
    {"OM": "Oman"},
    {"PK": "Pakistan"},
    {"PW": "Palau"},
    {"PS": "Palestinian Territory, Occupied"},
    {"PA": "Panama"},
    {"PG": "Papua New Guinea"},
    {"PY": "Paraguay"},
    {"PE": "Peru"},
    {"PH": "Philippines"},
    {"PN": "Pitcairn"},
    {"PL": "Poland"},
    {"PT": "Portugal"},
    {"PR": "Puerto Rico"},
    {"QA": "Qatar"},
    {"RE": "Reunion"},
    {"RO": "Romania"},
    {"RU": "Russian Federation"},
    {"RW": "Rwanda"},
    {"BL": "Saint Barthelemy"},
    {"SH": "Saint Helena, Ascension and Tristan da Cunha"},
    {"KN": "Saint Kitts and Nevis"},
    {"LC": "Saint Lucia"},
    {"MF": "Saint Martin (French part)"},
    {"PM": "Saint Pierre and Miquelon"},
    {"VC": "Saint Vincent and the Grenadines"},
    {"WS": "Samoa"},
    {"SM": "San Marino"},
    {"ST": "Sao Tome and Principe"},
    {"SA": "Saudi Arabia"},
    {"SN": "Senegal"},
    {"RS": "Serbia"},
    {"SC": "Seychelles"},
    {"SL": "Sierra Leone"},
    {"SG": "Singapore"},
    {"SX": "Sint Maarten (Dutch part)"},
    {"SK": "Slovakia"},
    {"SI": "Slovenia"},
    {"SB": "Solomon Islands"},
    {"SO": "Somalia"},
    {"ZA": "South Africa"},
    {"GS": "South Georgia and the South Sandwich Islands"},
    {"SS": "South Sudan"},
    {"ES": "Spain"},
    {"LK": "Sri Lanka"},
    {"SD": "Sudan"},
    {"SR": "Suriname"},
    {"SJ": "Svalbard and Jan Mayen"},
    {"SZ": "Swaziland"},
    {"SE": "Sweden"},
    {"CH": "Switzerland"},
    {"SY": "Syrian Arab Republic"},
    {"TW": "Taiwan, Province of China"},
    {"TJ": "Tajikistan"},
    {"TZ": "Tanzania, United Republic of"},
    {"TH": "Thailand"},
    {"TL": "Timor-Leste"},
    {"TG": "Togo"},
    {"TK": "Tokelau"},
    {"TO": "Tonga"},
    {"TT": "Trinidad and Tobago"},
    {"TN": "Tunisia"},
    {"TR": "Turkey"},
    {"TM": "Turkmenistan"},
    {"TC": "Turks and Caicos Islands"},
    {"TV": "Tuvalu"},
    {"UG": "Uganda"},
    {"UA": "Ukraine"},
    {"AE": "United Arab Emirates"},
    {"GB": "United Kingdom"},
    {"US": "United States"},
    {"UM": "United States Minor Outlying Islands"},
    {"UY": "Uruguay"},
    {"UZ": "Uzbekistan"},
    {"VU": "Vanuatu"},
    {"VE": "Venezuela, Bolivarian Republic of"},
    {"VN": "Viet Nam"},
    {"VG": "Virgin Islands, British"},
    {"VI": "Virgin Islands, U.S."},
    {"WF": "Wallis and Futuna"},
    {"EH": "Western Sahara"},
    {"YE": "Yemen"},
    {"ZM": "Zambia"},
    {"ZW": "Zimbabwe"}
];

return {timezones: timezones, countries: countries};

});
