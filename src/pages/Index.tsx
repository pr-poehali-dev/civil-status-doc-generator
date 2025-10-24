import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { BirthCertificateForm } from '@/components/BirthCertificateForm';
import { DeathCertificateForm } from '@/components/DeathCertificateForm';
import { MarriageCertificateForm } from '@/components/MarriageCertificateForm';
import { NameChangeCertificateForm } from '@/components/NameChangeCertificateForm';

type DocumentType = 'birth' | 'death' | 'marriage' | 'name_change';
type DocumentStatus = 'draft' | 'processing' | 'ready' | 'issued' | 'archived';

interface Document {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  fullName: string;
  status: DocumentStatus;
}

const documentTypes = {
  birth: 'Рождение',
  death: 'Смерть',
  marriage: 'Брак',
  name_change: 'Смена имени',
};

const statusColors: Record<DocumentStatus, string> = {
  draft: 'bg-gray-200 text-gray-700',
  processing: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  issued: 'bg-purple-100 text-purple-700',
  archived: 'bg-slate-200 text-slate-600',
};

const statusLabels: Record<DocumentStatus, string> = {
  draft: 'Черновик',
  processing: 'В обработке',
  ready: 'Готов',
  issued: 'Выдан',
  archived: 'Архив',
};

const mockDocuments: Document[] = [
  { id: '1', type: 'birth', number: 'I-МЮ №234567', date: '25.05.2023', fullName: 'Иванов Иван Иванович', status: 'processing' },
  { id: '2', type: 'marriage', number: 'II-МЮ №123456', date: '15.04.2023', fullName: 'Петрова Анна Сергеевна', status: 'ready' },
  { id: '3', type: 'death', number: 'III-МЮ №345678', date: '10.03.2023', fullName: 'Сидоров Петр Николаевич', status: 'issued' },
  { id: '4', type: 'name_change', number: 'IV-МЮ №456789', date: '28.02.2023', fullName: 'Козлова Мария Александровна', status: 'draft' },
];

const Index = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [activeTab, setActiveTab] = useState('registry');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDocType, setNewDocType] = useState<DocumentType>('birth');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewDocumentOpen, setViewDocumentOpen] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: documents.length,
    draft: documents.filter(d => d.status === 'draft').length,
    processing: documents.filter(d => d.status === 'processing').length,
    ready: documents.filter(d => d.status === 'ready').length,
  };

  const handleCreateDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      type: newDocType,
      number: `${newDocType.toUpperCase()}-МЮ №${Math.floor(Math.random() * 900000) + 100000}`,
      date: new Date().toLocaleDateString('ru-RU'),
      fullName: 'Новый документ',
      status: 'draft',
    };
    setDocuments([newDoc, ...documents]);
    setIsCreateOpen(false);
    toast.success('Документ создан', { description: `Номер: ${newDoc.number}` });
  };

  const handleExportDocument = (doc: Document) => {
    window.print();
    toast.info('Экспорт документа', { description: `${doc.number} отправлен на печать` });
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setViewDocumentOpen(true);
  };

  const handleEditDocument = (doc: Document) => {
    setNewDocType(doc.type);
    setActiveTab('create');
    toast.info('Редактирование документа', { description: `${doc.number}` });
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
    toast.success('Документ удалён');
  };

  const handleChangeStatus = (docId: string, newStatus: DocumentStatus) => {
    setDocuments(documents.map(d => d.id === docId ? { ...d, status: newStatus } : d));
    toast.success('Статус изменён', { description: statusLabels[newStatus] });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
              <Icon name="FileText" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Система ЗАГС</h1>
              <p className="text-sm text-muted-foreground">Управление документами</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="registry" className="gap-2">
              <Icon name="FolderOpen" size={16} />
              Реестр документов
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2">
              <Icon name="FilePlus" size={16} />
              Создание документа
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Icon name="Search" size={16} />
              Поиск
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="archive" className="gap-2">
              <Icon name="Archive" size={16} />
              Архив
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registry" className="space-y-6 fade-in">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего документов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Черновики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-600">{stats.draft}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">В обработке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.processing}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Готовы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.ready}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Реестр документов</CardTitle>
                  <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={16} />
                        Создать документ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Создание нового документа</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Тип документа</Label>
                          <Select value={newDocType} onValueChange={(v) => setNewDocType(v as DocumentType)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="birth">Свидетельство о рождении</SelectItem>
                              <SelectItem value="death">Свидетельство о смерти</SelectItem>
                              <SelectItem value="marriage">Свидетельство о браке</SelectItem>
                              <SelectItem value="name_change">Свидетельство о смене имени</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleCreateDocument} className="w-full">
                          Создать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Поиск по ФИО или номеру..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={filterType} onValueChange={(v) => setFilterType(v as DocumentType | 'all')}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Тип документа" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="birth">Рождение</SelectItem>
                      <SelectItem value="death">Смерть</SelectItem>
                      <SelectItem value="marriage">Брак</SelectItem>
                      <SelectItem value="name_change">Смена имени</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as DocumentStatus | 'all')}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="draft">Черновик</SelectItem>
                      <SelectItem value="processing">В обработке</SelectItem>
                      <SelectItem value="ready">Готов</SelectItem>
                      <SelectItem value="issued">Выдан</SelectItem>
                      <SelectItem value="archived">Архив</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-md">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium">Номер</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Тип</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">ФИО</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Дата</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Статус</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-sm font-mono">{doc.number}</td>
                          <td className="px-4 py-3 text-sm">{documentTypes[doc.type]}</td>
                          <td className="px-4 py-3 text-sm font-medium">{doc.fullName}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{doc.date}</td>
                          <td className="px-4 py-3">
                            <Badge className={statusColors[doc.status]} variant="secondary">
                              {statusLabels[doc.status]}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditDocument(doc)}>
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleExportDocument(doc)}>
                                <Icon name="Printer" size={16} />
                              </Button>
                              <Select onValueChange={(v) => handleChangeStatus(doc.id, v as DocumentStatus)}>
                                <SelectTrigger className="h-8 w-8 p-0 border-0">
                                  <Icon name="MoreVertical" size={16} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="draft">Черновик</SelectItem>
                                  <SelectItem value="processing">В обработке</SelectItem>
                                  <SelectItem value="ready">Готов</SelectItem>
                                  <SelectItem value="issued">Выдан</SelectItem>
                                  <SelectItem value="archived">Архив</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Создание нового документа</CardTitle>
                  <Select value={newDocType} onValueChange={(v) => setNewDocType(v as DocumentType)}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birth">Свидетельство о рождении</SelectItem>
                      <SelectItem value="death">Свидетельство о смерти</SelectItem>
                      <SelectItem value="marriage">Свидетельство о браке</SelectItem>
                      <SelectItem value="name_change">Свидетельство о смене имени</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {newDocType === 'birth' && <BirthCertificateForm onSave={() => setActiveTab('registry')} />}
                {newDocType === 'death' && <DeathCertificateForm onSave={() => setActiveTab('registry')} />}
                {newDocType === 'marriage' && <MarriageCertificateForm onSave={() => setActiveTab('registry')} />}
                {newDocType === 'name_change' && <NameChangeCertificateForm onSave={() => setActiveTab('registry')} />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Поиск по базе документов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ФИО</Label>
                    <Input 
                      placeholder="Поиск по фамилии, имени или отчеству"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Тип документа</Label>
                    <Select value={filterType} onValueChange={(v) => setFilterType(v as DocumentType | 'all')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="birth">Рождение</SelectItem>
                        <SelectItem value="death">Смерть</SelectItem>
                        <SelectItem value="marriage">Брак</SelectItem>
                        <SelectItem value="name_change">Смена имени</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Статус</Label>
                    <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as DocumentStatus | 'all')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Все статусы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="processing">В обработке</SelectItem>
                        <SelectItem value="ready">Готов</SelectItem>
                        <SelectItem value="issued">Выдан</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredDocuments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold mb-3">Результаты поиска: {filteredDocuments.length}</h3>
                    <div className="border rounded-md">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium">Номер</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Тип</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">ФИО</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Дата</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Статус</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleViewDocument(doc)}>
                              <td className="px-4 py-3 text-sm font-mono">{doc.number}</td>
                              <td className="px-4 py-3 text-sm">{documentTypes[doc.type]}</td>
                              <td className="px-4 py-3 text-sm font-medium">{doc.fullName}</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{doc.date}</td>
                              <td className="px-4 py-3">
                                <Badge className={statusColors[doc.status]} variant="secondary">
                                  {statusLabels[doc.status]}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 fade-in">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Документы по типам</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Свидетельства о рождении</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Свидетельства о браке</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Свидетельства о смерти</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Свидетельства о смене имени</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Документы по статусам</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Черновики</span>
                    <Badge className={statusColors.draft}>{stats.draft}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">В обработке</span>
                    <Badge className={statusColors.processing}>{stats.processing}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Готовы к выдаче</span>
                    <Badge className={statusColors.ready}>{stats.ready}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Выданы</span>
                    <Badge className={statusColors.issued}>1</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Отчет за период</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Период</Label>
                    <Select defaultValue="month">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Неделя</SelectItem>
                        <SelectItem value="month">Месяц</SelectItem>
                        <SelectItem value="quarter">Квартал</SelectItem>
                        <SelectItem value="year">Год</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Icon name="Download" size={16} />
                  Экспортировать отчет
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive" className="fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Архив документов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="Archive" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Архивные документы</p>
                  <p className="text-sm">Документы с истекшим сроком хранения</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;