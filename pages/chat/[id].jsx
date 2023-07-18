import { Box } from "@mui/material";
import ChatComponent from "components/messages/ChatComponent";
import ChatNavbar from "components/messages/ChatNav";
import UserListComponent from "components/user/UserListComponent";
import AuthContext from "contexts/AuthContext";
import { collection, query, orderBy, onSnapshot, addDoc, where, doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "lib/data/firebase";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function ChatPage() {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverData, setReceiverData] = useState(null);

    useEffect(() => {
        const messagesCollectionRef = collection(firebaseDB, 'messages');
        const queryIds = [id, user.uid]

        const messagesQuery = query(
            messagesCollectionRef,
            orderBy('time'),
            where('receiverId', 'in', queryIds),
            where('senderId', 'in', queryIds)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(updatedMessages);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [id]);


    useEffect(() => {
        const fetchReceiverData = async () => {
            try {
                const receiverDocRef = doc(firebaseDB, 'users', id);
                const receiverSnapshot = await getDoc(receiverDocRef);
                if (receiverSnapshot.exists()) {
                    setReceiverData(receiverSnapshot.data());
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchReceiverData();
        }
    }, [id]);

    const handleSendMessage = async (e) => {
        if (newMessage) {
            const message = {
                text: newMessage,
                time: new Date().toISOString(),
                senderId: user.uid,
                receiverId: id,
            };

            try {
                const messagesCollectionRef = collection(firebaseDB, 'messages');
                await addDoc(messagesCollectionRef, message);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <UserListComponent />
            <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ChatNavbar userId={id} />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <ChatComponent messages={messages} handleSendMessage={handleSendMessage}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        receiverDataImg={receiverData?.profilePicture}
                        senderDataImg={user?.userData?.profilePicture}
                        userId={user.uid}
                    />
                </Box>
            </Box>
        </Box>
    )
}