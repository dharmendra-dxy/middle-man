import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Copy, Trash2, RefreshCw } from 'lucide-react'
import { useWSStore } from '@/store/use-websocket.store'
import Editor from '@monaco-editor/react'
import { toast } from 'sonner'

const RealtimeMessageEditor = () => {

  const { 
    send, 
    status,
    isConnected, 
    draftMessage, 
    setDraftMessage, 
    messages 
  } = useWSStore()
  
  const [isSending, setIsSending] = useState(false)
  const [lastSent, setLastSent] = useState('')
  const editorRef = useRef(null)
  const monacoRef = useRef(null)


  return (
    <div>
      RealtimeMessageEditor
    </div>
  );
};

export default RealtimeMessageEditor;
