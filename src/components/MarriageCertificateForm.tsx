import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { DocumentPreview } from './DocumentPreview';

interface MarriageData {
  groomLastNameBefore: string;
  groomFirstName: string;
  groomMiddleName: string;
  groomBirthDate: string;
  groomCitizenship: string;
  groomLastNameAfter: string;
  brideLastNameBefore: string;
  brideFirstName: string;
  brideMiddleName: string;
  brideBirthDate: string;
  brideCitizenship: string;
  brideLastNameAfter: string;
  marriageDate: string;
  marriagePlace: string;
  registrationDate: string;
  registrationPlace: string;
}

export const MarriageCertificateForm = ({ onSave }: { onSave: () => void }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<MarriageData>({
    groomLastNameBefore: '',
    groomFirstName: '',
    groomMiddleName: '',
    groomBirthDate: '',
    groomCitizenship: 'Российская Федерация',
    groomLastNameAfter: '',
    brideLastNameBefore: '',
    brideFirstName: '',
    brideMiddleName: '',
    brideBirthDate: '',
    brideCitizenship: 'Российская Федерация',
    brideLastNameAfter: '',
    marriageDate: '',
    marriagePlace: '',
    registrationDate: '',
    registrationPlace: '',
  });

  const handleChange = (field: keyof MarriageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.groomFirstName || !formData.brideFirstName || !formData.marriageDate) {
      toast.error('Заполните обязательные поля');
      return;
    }
    onSave();
    toast.success('Свидетельство о браке сохранено');
  };

  const handlePreview = () => {
    if (!formData.groomFirstName || !formData.brideFirstName || !formData.marriageDate) {
      toast.error('Заполните обязательные поля для предпросмотра');
      return;
    }
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
    toast.info('Документ отправлен на печать');
    setShowPreview(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о женихе</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия до брака *</Label>
            <Input 
              value={formData.groomLastNameBefore} 
              onChange={(e) => handleChange('groomLastNameBefore', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.groomFirstName} 
              onChange={(e) => handleChange('groomFirstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.groomMiddleName} 
              onChange={(e) => handleChange('groomMiddleName', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Дата рождения</Label>
            <Input 
              type="date" 
              value={formData.groomBirthDate} 
              onChange={(e) => handleChange('groomBirthDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Гражданство</Label>
            <Input 
              value={formData.groomCitizenship} 
              onChange={(e) => handleChange('groomCitizenship', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Фамилия после брака</Label>
            <Input 
              value={formData.groomLastNameAfter} 
              onChange={(e) => handleChange('groomLastNameAfter', e.target.value)}
              placeholder="Если изменилась"
            />
          </div>
        </div>
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о невесте</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия до брака *</Label>
            <Input 
              value={formData.brideLastNameBefore} 
              onChange={(e) => handleChange('brideLastNameBefore', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.brideFirstName} 
              onChange={(e) => handleChange('brideFirstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.brideMiddleName} 
              onChange={(e) => handleChange('brideMiddleName', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Дата рождения</Label>
            <Input 
              type="date" 
              value={formData.brideBirthDate} 
              onChange={(e) => handleChange('brideBirthDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Гражданство</Label>
            <Input 
              value={formData.brideCitizenship} 
              onChange={(e) => handleChange('brideCitizenship', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Фамилия после брака</Label>
            <Input 
              value={formData.brideLastNameAfter} 
              onChange={(e) => handleChange('brideLastNameAfter', e.target.value)}
              placeholder="Если изменилась"
            />
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о заключении брака</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата заключения брака *</Label>
            <Input 
              type="date" 
              value={formData.marriageDate} 
              onChange={(e) => handleChange('marriageDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место заключения брака</Label>
            <Input 
              value={formData.marriagePlace} 
              onChange={(e) => handleChange('marriagePlace', e.target.value)}
              placeholder="Дворец бракосочетания, адрес"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о регистрации</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата регистрации</Label>
            <Input 
              type="date" 
              value={formData.registrationDate} 
              onChange={(e) => handleChange('registrationDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место регистрации</Label>
            <Input 
              value={formData.registrationPlace} 
              onChange={(e) => handleChange('registrationPlace', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={handleSave} className="gap-2">
          <Icon name="Save" size={16} />
          Сохранить
        </Button>
        <Button onClick={handlePreview} variant="outline" className="gap-2">
          <Icon name="Eye" size={16} />
          Предпросмотр
        </Button>
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Icon name="Printer" size={16} />
          Печать на бланк
        </Button>
        <Button variant="outline" className="gap-2">
          <Icon name="FileCheck" size={16} />
          Отправить на проверку
        </Button>
      </div>

      {showPreview && (
        <DocumentPreview
          type="marriage"
          number={`II-МЮ №${Math.floor(Math.random() * 900000) + 100000}`}
          data={formData}
          onPrint={handlePrint}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};