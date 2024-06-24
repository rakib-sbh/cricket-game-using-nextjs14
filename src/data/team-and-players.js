const teamAndPlayers = {
  Bangladesh: [
    {
      name: "Sakib Al Hasan",
      roles: ["Captain", "All Rounder"],
      country: "Bangladesh",
    },
    {
      name: "Nazmul Hassain Shanto",
      roles: ["Batsman"],
    },
    {
      name: "Tanzid Hasan",
      role: ["Batsman"],
    },
    {
      name: "Mustafizur Rahman",
      roles: ["Bowler"],
    },
    {
      name: "Mahmudullah Riyad",
      roles: ["All Rounder"],
    },
    {
      name: "Towhid Hridoy",
      roles: ["Batsman"],
    },
    {
      name: "Tanzim Hasan Sakib",
      roles: ["Bowler"],
    },
    {
      name: "Liton Das",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Mushfiqur Rahim",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Mehidy Hasan Miraz",
      roles: ["All Rounder"],
    },
    {
      name: "Taskin Ahmed",
      roles: ["Bowler"],
    },
  ],
  India: [
    {
      name: "Virat Kohli",
      roles: ["Captain", "All Rounder"],
    },
    {
      name: "Rohit Sharma",
      roles: ["Batsman"],
    },
    {
      name: "Sikhar Dhawan",
      roles: ["Batsman"],
    },
    {
      name: "Shubman Gill",
      roles: ["Batsman"],
    },
    {
      name: "Shreyas Iyer",
      roles: ["Batsman"],
    },
    {
      name: "Hardik Pandya",
      roles: ["All Rounder"],
    },
    {
      name: "Ravindra Jadeja",
      roles: ["All Rounder"],
    },
    {
      name: "Ravichandran Ashwin",
      roles: ["All Rounder"],
    },
    {
      name: "Sanju Samson",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Jasprit Bumrah",
      roles: ["Bowler"],
    },
    {
      name: "Mohammed Shami",
      roles: ["Bowler"],
    },
  ],
  Afghanistan: [
    {
      name: "Asghar Afghan",
      roles: ["Batsman"],
    },
    {
      name: "Hashmatullah Shahidi",
      roles: ["Captain", "Batsman"],
    },
    {
      name: "Hazratullah Zazai",
      roles: ["Batsman"],
    },
    {
      name: "Najubullah Zadran",
      roles: ["Batsman"],
    },
    {
      name: "Rahmat Shah",
      roles: ["Batsman"],
    },
    {
      name: "Samiullah Shinwari",
      roles: ["All Rounder"],
    },
    {
      name: "gulbadin Naib",
      roles: ["All Rounder"],
    },
    {
      name: "Muhammad Nabi",
      roles: ["All Rounder"],
    },
    {
      name: "Rashid Khan",
      roles: ["All Rounder"],
    },
    {
      name: "Muhammad Shahzad",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Aftab Alam",
      roles: ["Bowler"],
    },
  ],
  Pakistan: [
    {
      name: "Fakhar Zaman",
      roles: ["Batsman"],
    },
    {
      name: "Imam-ul-Haq",
      roles: ["Batsman"],
    },
    {
      name: "Babar Azam",
      roles: ["Captain", "Batsman"],
    },
    {
      name: "Asif Ali",
      roles: ["Batsman"],
    },
    {
      name: "Imad Wasim",
      roles: ["All Rounder"],
    },
    {
      name: "Haris Sohail",
      roles: ["All Rounder"],
    },
    {
      name: "Muhammad Hafeez",
      roles: ["All Rounder"],
    },
    {
      name: "Shoaib Malik",
      roles: ["All Rounder"],
    },
    {
      name: "Sarfaraz Ahmed",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Wahad Riaz",
      roles: ["Bowler"],
    },
    {
      name: "Hasan Ali",
      roles: ["Bowler"],
    },
  ],
  Australia: [
    {
      name: "Aaron Finch",
      roles: ["Batsman"],
    },
    {
      name: "Steven Smith",
      roles: ["Batsman"],
    },
    {
      name: "David Warner",
      roles: ["Batsman"],
    },
    {
      name: "Travis Head",
      roles: ["Batsman"],
    },
    {
      name: "Glenn Maxwell",
      roles: ["All Rounder"],
    },
    {
      name: "Marcus Stoinis",
      roles: ["All Rounder"],
    },
    {
      name: "Daniel Sams",
      roles: ["All Rounder"],
    },
    {
      name: "Alex Carey",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Patt Cummins",
      roles: ["Captain", "Bowler"],
    },
    {
      name: "Mitchell Starc",
      roles: ["Bowler"],
    },
    {
      name: "Adam Zampa",
      roles: ["Bowler"],
    },
  ],
  "Sri Lanka": [
    {
      name: "Lahiru Thirimanne",
      roles: ["Captain", "Batsman"],
    },
    {
      name: "Mimuth Karunaratne",
      roles: ["Batsman"],
    },
    {
      name: "Avishka Fernando",
      roles: ["Batsman"],
    },
    {
      name: "Angelo Mathews",
      roles: ["All Rounder"],
    },
    {
      name: "Dhananjaya de Silva",
      roles: ["All Rounder"],
    },
    {
      name: "Milinda Siriwardana",
      roles: ["All Rounder"],
    },
    {
      name: "Thisara Perera",
      roles: ["All Rounder"],
    },
    {
      name: "Kusal Perera",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Suranga Lakmal",
      roles: ["Bowler"],
    },
    {
      name: "Lasith Malinga",
      roles: ["Bowler"],
    },
    {
      name: "Nuwan Pradeep",
      roles: ["Bowler"],
    },
  ],
  England: [
    {
      name: "Eoin Morgan",
      roles: ["Batsman"],
    },
    {
      name: "Joe Root",
      roles: ["Batsman"],
    },
    {
      name: "Jason Roy",
      roles: ["Batsman"],
    },
    {
      name: "Dawid Malan",
      roles: ["Batsman"],
    },
    {
      name: "Moeen Ali",
      roles: ["All Rounder"],
    },
    {
      name: "Ben Stokes",
      roles: ["All Rounder"],
    },
    {
      name: "Liam Livingstone",
      roles: ["All Rounder"],
    },
    {
      name: "Chris Woakes",
      roles: ["All Rounder"],
    },
    {
      name: "Jos Buttler",
      roles: ["Captain", "Wicker Keeper"],
    },
    {
      name: "Adil Rashid",
      roles: ["Bowler"],
    },
    {
      name: "Mark Wood",
      roles: ["Bowler"],
    },
  ],
  "New Zealand": [
    {
      name: "Martin Guptill",
      roles: ["Batsman"],
    },
    {
      name: "Ross Taylor",
      roles: ["Batsman"],
    },
    {
      name: "Kane Williamson",
      roles: ["Captain", "Batsman"],
    },
    {
      name: "Colin Munro",
      roles: ["Batsman"],
    },
    {
      name: "James Neesham",
      roles: ["All Rounder"],
    },
    {
      name: "Colin de Grandhomme",
      roles: ["All Rounder"],
    },
    {
      name: "Mitchell Santner",
      roles: ["All Rounder"],
    },
    {
      name: "Tom Latham",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Trent Boult",
      roles: ["Bowler"],
    },
    {
      name: "Matt Henry",
      roles: ["Bowler"],
    },
    {
      name: "Tim Southee",
      roles: ["Bowler"],
    },
  ],
  "South Africa": [
    {
      name: "Faf du Plessis",
      roles: ["Batsman"],
    },
    {
      name: "David Miller",
      roles: ["Batsman"],
    },
    {
      name: "Aiden Markram",
      roles: ["Captain", "Batsman"],
    },
    {
      name: "Rassie van der Dussen",
      roles: ["Batsman"],
    },
    {
      name: "Jean-Paul Duminy",
      roles: ["All Rounder"],
    },
    {
      name: "Andile Phehlukwayo",
      roles: ["All Rounder"],
    },
    {
      name: "Dwaine Pretorius",
      roles: ["All Rounder"],
    },
    {
      name: "Chris Morris",
      roles: ["All Rounder"],
    },
    {
      name: "Quinton de Kock",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Imran Tahir",
      roles: ["Bowler"],
    },
    {
      name: "Tabraiz Shamsi",
      roles: ["Bowler"],
    },
  ],
  Ireland: [
    {
      name: "William Porterfield",
      roles: ["Batsman"],
    },
    {
      name: "James McCollum",
      roles: ["Batsman"],
    },
    {
      name: "Andreq Balbirnie",
      roles: ["Batsman"],
    },
    {
      name: "Tyrone Kane",
      roles: ["All Rounder"],
    },
    {
      name: "Kevin O Brien",
      roles: ["All Rounder"],
    },
    {
      name: "Paul Stirling",
      roles: ["Captain", "All Rounder"],
    },
    {
      name: "Stuart Thompson",
      roles: ["All Rounder"],
    },
    {
      name: "George Dockrell",
      roles: ["All Rounder"],
    },
    {
      name: "Gary Wilson",
      roles: ["Wicket Keeper"],
    },
    {
      name: "Peter Chase",
      roles: ["Bowler"],
    },
    {
      name: "Mark Adair",
      roles: ["Bowler"],
    },
  ],
};

export default teamAndPlayers;
