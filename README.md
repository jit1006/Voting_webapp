# Voting Webapp

A secure voting application with real-time results and admin management.

## Features

- **User Authentication**: Sign in/sign up with Aadhar card number and password
- **Candidate Management**: View list of all candidates with live vote counts
- **Voting System**: Cast one vote per user; voting restrictions enforced after initial vote
- **Live Results**: Real-time leaderboard showing candidates sorted by vote count
- **User Verification**: Aadhar card number required for user identity validation
- **Admin Panel**: Dedicated admin role for candidate table maintenance (voting disabled)
- **Password Management**: Users can update their password anytime
- admin cant vote at all.

## API Routes

### User Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create a new user account |
| POST | `/login` | Login to an existing account |

### Voting
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/candidates` | Get list of all candidates |
| POST | `/vote/:candidateId` | Vote for a specific candidate |

### Results
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vote/counts` | Get candidates sorted by vote count |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user's profile information |
| PUT | `/profile/password` | Change user's password |

### Admin Candidate Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/candidates` | Create a new candidate |
| PUT | `/candidates/:candidateId` | Update an existing candidate |
| DELETE | `/candidates/:candidateId` | Delete a candidate |