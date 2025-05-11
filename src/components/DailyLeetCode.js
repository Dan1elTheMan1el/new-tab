import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import DoneIcon from '@mui/icons-material/Done';
import HelpIcon from '@mui/icons-material/Help';

const DailyLeetCode = ({ colors, username }) => {
    const [questionData, setQuestionData] = useState(null);
    const [questionLink, setQuestionLink] = useState('https://leetcode.com/');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSolved, setIsSolved] = useState(false);
    const [userExists, setUserExists] = useState(true);
    
    useEffect(() => {
        const fetchDailyQuestion = async () => {
            try {
                setIsLoading(true);
                
                // First, fetch the daily question using LeetCode's GraphQL API
                const dailyQuestionResponse = await fetch('https://leetcode-proxy.friedmandaniel111.workers.dev/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query questionOfToday {
                                activeDailyCodingChallengeQuestion {
                                    date
                                    userStatus
                                    link
                                    question {
                                        titleSlug
                                        frontendQuestionId: questionFrontendId
                                        title
                                        difficulty
                                    }
                                }
                            }
                        `
                    })
                });
                
                if (!dailyQuestionResponse.ok) {
                    throw new Error(`API request failed with status ${dailyQuestionResponse.status}`);
                }
                
                const dailyData = await dailyQuestionResponse.json();
                
                if (dailyData?.data?.activeDailyCodingChallengeQuestion) {
                    const questionInfo = dailyData.data.activeDailyCodingChallengeQuestion;
                    console.log('Daily question info:', questionInfo);
                    setQuestionData(questionInfo);
                    
                    // Set the question link
                    let link;
                    
                    // Handle different formats of links that may come from the API
                    if (questionInfo.link) {
                        if (questionInfo.link.startsWith('http')) {
                            // Full URL already
                            link = questionInfo.link;
                        } else if (questionInfo.link.startsWith('/')) {
                            // Path starting with slash
                            link = `https://leetcode.com${questionInfo.link}`;
                        } else {
                            // Path without slash
                            link = `https://leetcode.com/${questionInfo.link}`;
                        }
                    } else if (questionInfo.question && questionInfo.question.titleSlug) {
                        // Fallback to constructing URL from titleSlug if link is not provided
                        link = `https://leetcode.com/problems/${questionInfo.question.titleSlug}/`;
                    } else {
                        // Default LeetCode URL as last resort
                        link = 'https://leetcode.com/problemset/all/';
                    }
                    
                    setQuestionLink(link);
                    console.log('Setting question link to:', link);
                    
                    const titleSlug = questionInfo.question.titleSlug;
                    
                    // Only fetch user data if username is provided
                    if (username) {
                        // Fetch user's recent submissions
                        const submissionsResponse = await fetch('https://leetcode-proxy.friedmandaniel111.workers.dev/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: `
                                    query userRecentSubmissions($username: String!) {
                                        recentSubmissionList(username: $username) {
                                            titleSlug
                                            statusDisplay
                                            timestamp
                                        }
                                    }
                                `,
                                variables: {
                                    username: username
                                }
                            })
                        });
                        
                        if (submissionsResponse.ok) {
                            const submissionsData = await submissionsResponse.json();
                            const recentSubmissions = submissionsData?.data?.recentSubmissionList;
                            
                            if (recentSubmissions === null) {
                                // User doesn't exist
                                setUserExists(false);
                                console.log(`LeetCode user ${username} doesn't exist`);
                            } else {
                                setUserExists(true);
                                // Check if the daily problem is in the user's accepted submissions
                                const solvedSubmission = recentSubmissions?.find(
                                    submission => submission.titleSlug === titleSlug && submission.statusDisplay === "Accepted"
                                );
                                
                                if (solvedSubmission) {
                                    setIsSolved(true);
                                    console.log(`User has solved today's problem: ${titleSlug}`);
                                } else {
                                    console.log(`User hasn't solved today's problem yet: ${titleSlug}`);
                                }
                            }
                        }
                    } else {
                        // No username provided
                        setUserExists(false);
                    }
                } else {
                    console.warn('API response missing expected data', dailyData);
                }
            } catch (err) {
                console.error('Error fetching daily LeetCode question:', err);
                setError(err.message);
                // Keep the default link on error
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchDailyQuestion();
    }, [username]);
    
    // Helper function to get color based on difficulty
    const getDifficultyColor = (difficulty) => {
        if (!difficulty) return colors.textColor;
        
        switch(difficulty.toLowerCase()) {
            case 'easy': return '#00B8A3';
            case 'medium': return '#FFC01E';
            case 'hard': return '#FF375F';
            default: return colors.textColor;
        }
    };

    return (
        <Card elevation={3} sx={{ 
            maxWidth: 400, 
            minWidth: 400, 
            color: colors.textColor, 
            backgroundColor: colors.secondaryColor, 
            marginTop: '20px' 
        }}>
            <CardActionArea href={questionLink} rel="noopener">
                <CardContent sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Box sx={{ mr: 1.5 }}>
                                <CodeIcon sx={{ 
                                    width: '28px', 
                                    height: '28px',
                                    color: colors.textColor 
                                }} />
                            </Box>
                            <h3 style={{ margin: 0 }}>
                                {isLoading ? 'Loading...' : error ? 'LeetCode' : 'Daily LeetCode'}
                            </h3>
                        </div>
                        {!userExists ? (
                            <HelpIcon sx={{ 
                                color: '#FFC107',
                                width: '24px',
                                height: '24px'
                            }} />
                        ) : isSolved && (
                            <DoneIcon sx={{ 
                                color: '#00C853',
                                width: '24px',
                                height: '24px'
                            }} />
                        )}
                    </div>
                    
                    {!isLoading && !error && questionData && (
                        <div style={{
                            marginTop: '8px',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                            }}>
                                <span style={{ 
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>
                                    {questionData.question.frontendQuestionId}.
                                </span>
                                <span style={{ 
                                    fontSize: '14px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {questionData.question.title}
                                </span>
                            </div>
                            
                            <div style={{
                                marginTop: '4px',
                                fontSize: '12px',
                                color: getDifficultyColor(questionData.question.difficulty)
                            }}>
                                {questionData.question.difficulty}
                            </div>
                        </div>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default DailyLeetCode;
