import { Injectable } from '@angular/core';
import { DataUrl, NgxImageCompressService, UploadResponse } from 'ngx-image-compress';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprimirImagemService {
  constructor(private imageCompress: NgxImageCompressService) { }

   /**
   * Comprime um arquivo de imagem
   * @param imageFile - Arquivo de imagem a ser comprimido
   * @returns Promise com o resultado da compressão em formato DataUrl
   */
   async compressFile(imageFile: File): Promise<DataUrl> {
    try {
      const imageDataUrl = await this.convertFileToBase(imageFile);

      const sizeBeforeCompress = this.imageCompress.byteCount(imageDataUrl);
      console.log('Tamanho antes da compressão:', sizeBeforeCompress, 'bytes');
      // ratio: 50 = reduz pela metade o tamanho da imagem
      // qualidade: 50 = mantém 50% da qualidade original
      const compressedImage = await this.imageCompress.compressFile(imageDataUrl, -1, 50, 50);

      const sizeAfterCompress = this.imageCompress.byteCount(compressedImage);
      console.log('Tamanho após a compressão:', sizeAfterCompress, 'bytes');
      console.log('Taxa de compressão:', ((sizeBeforeCompress - sizeAfterCompress) / sizeBeforeCompress * 100).toFixed(2) + '%');

      return compressedImage;
    } catch (error) {
      console.error('Erro ao comprimir imagem:', error);
      throw error;
    }
  }

  /**
   * Comprime um arquivo de imagem e retorna como Observable
   * @param imageFile - Arquivo de imagem a ser comprimido
   * @returns Observable com o resultado da compressão
   */
  compressFileObservable(imageFile: File): Observable<DataUrl> {
    return from(this.compressFile(imageFile));
  }

  /**
   * Converte um arquivo para base64 DataUrl
   * @param file - Arquivo a ser convertido
   * @returns Promise com o resultado da conversão
   */
  private convertFileToBase(file: File): Promise<DataUrl> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as DataUrl);
        } else {
          reject(new Error('Erro ao ler arquivo'));
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Valida o tamanho máximo da imagem
   * @param file - Arquivo a ser validado
   * @param maxSizeInMB - Tamanho máximo permitido em MB
   * @returns boolean indicando se o arquivo está dentro do limite
   */
  validateFileSize(file: File, maxSizeInMB: number): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  }
}
